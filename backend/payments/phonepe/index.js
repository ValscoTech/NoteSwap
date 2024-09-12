import express from "express";
const pgRouter = express.Router();
import axios from "axios";
import uniqid from "uniqid";
import sha256 from "sha256";
import dotenv from "dotenv";
import supabase from '../../database/supabaseClient.js';
import supabaseAdmin from '../../database/supabaseClient.js';

dotenv.config();

const PHONEPE_URL = process.env.PHONEPE_URL;
const MERCHANT_ID = process.env.MERCHANT_ID;
const SALT_KEY = process.env.SALT_KEY;
const SALT_KEY_INDEX = process.env.SALT_KEY_INDEX;

pgRouter.use(express.json());

pgRouter.post("/init", async (req, res) => {
    const { buyerId, sellerId, buyerMobNo, amount } = req.body;
    const payEndPoint = "/pg/v1/pay";
    const orderId = uniqid();
    const payload = {
        merchantId: MERCHANT_ID,
        merchantTransactionId: orderId,
        merchantUserId: buyerId,
        amount: amount * 100,
        redirectUrl: `${process.env.SITE_URL}/api/payments/status`,
        redirectMode: "REDIRECT",
        callbackUrl: `${process.env.SITE_URL}/api/payments/callback/${orderId}`,
        mobileNumber: buyerMobNo,
        paymentInstrument: {
            type: "PAY_PAGE"
        }
    };

    const base64EncPayLoad = Buffer.from(JSON.stringify(payload)).toString("base64");
    const checksum = sha256(base64EncPayLoad + payEndPoint + SALT_KEY) + "###" + SALT_KEY_INDEX;

    const options = {
        method: 'POST',
        url: `${PHONEPE_URL}${payEndPoint}`,
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'X-VERIFY': checksum,
        },
        data: {
            request: base64EncPayLoad
        }
    };

    try {
        const { data,error } = await supabase.from('Orders').insert([{buyerId, sellerId, buyerMobNo, fee:amount,txnId:orderId, status:"Pending", checksum:base64EncPayLoad}]).select();
        if(error){
            throw error;
        }
        //console.log(data);
        const resp = await axios(options);
        const result = resp.data;
        if (result.success) {
            const url = result.data.instrumentResponse.redirectInfo.url;
            res.json({ success: true, url: url });
        } else {
            res.status(400).json({ success: false, message: result.message });
        }
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        res.status(error.response ? error.response.status : 500).json({
            success: false,
            message: error.response ? error.response.data : error.message
        });
    }
});

pgRouter.post("/callback/:merchantTransactionId", async (req, res) => {
    const merchantTransactionId = req.params.merchantTransactionId;
    const receivedChecksum = req.headers['x-verify']; // Checksum sent by PhonePe in headers
    const base64Response = req.body.response; // Base64-encoded response from PhonePe in the body
    const payEndPoint = `/pg/v1/pay`; // This will be the endpoint used to compute checksum
    console.log(receivedChecksum);
    

    try {
        // Step 1: Decode the base64 response from PhonePe
        const decodedResponse = Buffer.from(base64Response, 'base64').toString('utf8');
        const phonepePayload = JSON.parse(decodedResponse); // Parse the JSON from decoded base64 string

        // Step 2: Fetch the stored checksum and other data from the database for the transaction
        const { data: orderData, error } = await supabase
            .from('Orders')
            .select('txnId, checksum') // Assuming the checksum was stored for this transaction
            .eq('txnId', merchantTransactionId)
            .single(); // Fetch only one record

        if (error || !orderData) {
            throw new Error('Order not found or failed to retrieve stored checksum');
        }

        const storedChecksum = orderData.checksum;

        // Step 3: Compute the checksum using the stored data (base64-encoded payload, payEndPoint, and SALT_KEY)
        const computedChecksum = sha256(storedChecksum + payEndPoint + SALT_KEY) + "###" + SALT_KEY_INDEX;

        // Step 4: Verify that the checksum matches the one received from PhonePe
        if (receivedChecksum !== computedChecksum) {
            return res.status(400).json({ success: false, message: "Checksum validation failed" });
        }

        // Step 5: Extract the status from the decoded response payload
        const { code, data } = phonepePayload;
        let updatedStatus;

        // Map the code received to the appropriate status in your database
        switch (code) {
            case "PAYMENT_SUCCESS":
                updatedStatus = "Success";
                break;
            case "PAYMENT_ERROR":
                updatedStatus = "Failed";
                break;
            case "PAYMENT_PENDING":
                updatedStatus = "Pending";
                break;
            default:
                updatedStatus = "Unknown";
        }

        // Step 6: Update the order status in the database
        const { data: updatedOrder, error: updateError } = await supabase
            .from('Orders')
            .update({ status: updatedStatus })
            .eq('txnId', merchantTransactionId)
            .select();

        if (updateError) {
            throw updateError;
        }

        // Step 7: Acknowledge the callback to PhonePe
        res.status(200).json({
            success: true,
            message: "Callback processed successfully",
        });
    } catch (error) {
        console.error("Error processing callback: ", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
});



export default pgRouter;