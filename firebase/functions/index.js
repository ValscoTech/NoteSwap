const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const axios = require('axios');
const uniqid = require('uniqid');
const sha256 = require('sha256');
const admin = require('firebase-admin');

admin.initializeApp();
admin.firestore();

const APP_URL = functions.config().app.url;
const PHONEPE_URL = functions.config().phonepe.url;
const MERCHANT_ID = functions.config().phonepe.merchant_id;
const SALT_KEY = functions.config().phonepe.salt_key;
const SALT_KEY_INDEX = functions.config().phonepe.salt_key_index;

exports.signup = functions.https.onRequest(async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(400).send('Method not allowed');
    }

    const { email, password, phone, department, block, specialization,name,url } = req.body;

    try {
        // Create user in Firebase Authentication
        const userRecord = await admin.auth().createUser({
            email,
            password,
            phoneNumber: phone,
            displayName:name,
            photoURL:url
        });
        console.log(userRecord);
        // Create Firestore document with user details
        await admin.firestore().collection('Users').doc(userRecord.uid).set({
            email,
            department,
            phoneNumber:phone,
            block,
            specialization,
            photoURL:url,
            displayName:name
        });
        res.status(201).send({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong' ,error:error.message});
    }
});

exports.verifyUser = functions.https.onRequest(async (req,res)=>{
    if(req.method!=='POST'){
        return res.status(400).send('Method not allowed');
    }
    const idToken = req.headers.authorization.split('Bearer ')[1];
    console.log('idToken :',idToken);

    try{
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const uid = decodedToken.uid;

        res.status(200).json({message:'User Authenticated',uid});
    } catch(err){
        console.log(err);
        res.status(401).json({message:'Invalid Token'});
    }
});


exports.customToken = functions.https.onRequest(async (req,res)=>{
    const { uid } = req.body;

    try{
        const customToken=await admin.auth().createCustomToken(uid);
        res.status(200).json({ token:customToken });
    } catch(error){
        res.status(500).json({ message:'Error creating custom token' });
    }
    
});

exports.updateUser=functions.https.onRequest(async (req,res)=>{

    if(req.method!=='PUT'){
        res.status(403).json({message:'Method Not Allowed'})
    }

    try{
        const idToken=req.headers.authorization.split('Bearer ')[1];
        if(!idToken){
            res.status(403).json({message:'Unauthorized'})
        }
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const uid=decodedToken.uid;
        const user = await admin.auth().getUser(uid);

        const updateData = {};
        const updateDB = {}
        const allowedFields = ["displayName","photoURL","email","phoneNumber"];
        const dbFields = ["displayName","photoURL","email","phoneNumber","block","specialization","department"]
        allowedFields.forEach(field=>{
            if(req.body[field]){
                updateData[field]=req.body[field]
            }
        })
        dbFields.forEach(field=>{
            if(req.body[field]){
                updateDB[field]=req.body[field]
            }
        })
        if(Object.keys(updateData).length===0){
            return res.status(400).json({message:'No fields to update'})
        }

        await admin.auth().updateUser(uid,updateData);
        await admin.firestore().collection('Users').doc(uid).update(updateDB);
        if(req.body.customClaims){
            await admin.auth().setCustomUserClaims(uid,req.body.customClaims)
        }
        res.status(200).json({message:'User updated successfully'});
    } catch(err){
        res.status(401).json({message:'Unable to update user'});
    }
});

exports.deleteUser = functions.https.onRequest(async (req,res)=>{
    if(req.method!=='DELETE'){
        return res.status(403).json({message:'Method Not Allowed'})
    }

    try{
        const idToken = req.headers.authorization.split('Bearer ')[1];
        if(!idToken){
            return res.status(403).json({message:'Unauthorized'});
        }
        const decodedToken=await admin.auth().verifyIdToken(idToken);
        const uid=decodedToken.uid;
        console.log(uid);
        await admin.auth().deleteUser(uid);
        await admin.firestore().collection('Users').doc(uid).delete();

        res.status(200).json({message:'User deleted successfully'});
    } catch(err){
        res.status(401).json({message:'Unable to delete user'});
    }
});

exports.logout = functions.https.onRequest(async (req,res)=>{
    const idToken = req.headers.authorization.split('Bearer ')[1];
    try{
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const uid = decodedToken.uid;

        await admin.auth().revokeRefreshTokens(uid);
        const user = await admin.auth().getUser(uid);
        const revocationTime = new Date(user.tokensValidAfterTime).getTime()/1000;
        const currentTime = new Date().getTime()/1000;

        res.status(200).send({
            message:'User logged out successfully',
            uid,
            tokenRevokedAt:user.tokensValidAfterTime,
            logoutEffective:revocationTime<currentTime
        });
    } catch(err){
        return res.status(401).json({message:'Unable to logout user'})
    }
});

exports.initPayment = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            const { sellerId, buyerId, buyerMobNo, amount } = req.body;

            if (!sellerId || !buyerId || !buyerMobNo || !amount) {
                return res.status(400).json({ success: false, message: 'Missing required fields' });
            }

            const timestamp = new Date();
            const orderId = uniqid();

            const payload = {
                merchantId: MERCHANT_ID,
                merchantTransactionId: orderId,
                merchantUserId: buyerId,
                amount: amount * 100, // Amount in paise
                redirectUrl: `${APP_URL}/payments/status`,
                redirectMode: "REDIRECT",
                callbackUrl: `${APP_URL}/payments/callback/${orderId}`,
                mobileNumber: buyerMobNo,
                paymentInstrument: {
                    type: "PAY_PAGE"
                }
            };

            const base64EncPayLoad = Buffer.from(JSON.stringify(payload)).toString("base64");
            const checksum = sha256(base64EncPayLoad + "/pg/v1/pay" + SALT_KEY) + "###" + SALT_KEY_INDEX;

            // To store the order in Firestore
            await admin.firestore().collection('Orders').add({
                createdAt:timestamp,
                sellerId,
                buyerId,
                buyerMobNo, 
                fee:amount, 
                txnId: orderId, 
                status: "Pending"
            });

            const response = await axios.post(`${PHONEPE_URL}/pg/v1/pay`, {
                request: base64EncPayLoad
            }, {
                headers: {
                    'X-VERIFY': checksum,
                    'Content-Type': 'application/json'
                }
            });

            const result = response.data;
            if (result.success && result.data && result.data.instrumentResponse && result.data.instrumentResponse.redirectInfo) {
                res.status(200).json({ success: true, url: result.data.instrumentResponse.redirectInfo.url });
            } else {
                console.error('Unexpected response structure:', JSON.stringify(result));
                res.status(400).json({ success: false, message: result.message || 'Payment initiation failed' });
            }
        } catch (error) {
            console.error('Error in initPayment:', error);
            res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
        }
    });
});