import express from "express";
const pgRouter = express.Router();
import axios from "axios";
import uniqid from "uniqid";
import sha256 from "sha256";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT;

const PHONEPE_URL = process.env.PHONEPE_URL;
const MERCHANT_ID = process.env.MERCHANT_ID;
const SALT_KEY = process.env.SALT_KEY;
const SALT_KEY_INDEX = process.env.SALT_KEY_INDEX;

pgRouter.use(express.json());

pgRouter.post("/init", async (req, res) => {
    const { userId,  amount, mobileNo } = req.body;
    const payEndPoint = "/pg/v1/pay";
    const orderId = uniqid();
    const payload = {
        merchantId: MERCHANT_ID,
        merchantTransactionId: orderId,
        merchantUserId: userId,
        amount: amount*100,
        redirectUrl: `${process.env.SITE_URL}${port}/payments/status`,
        redirectMode: "REDIRECT",
        callbackUrl: `${process.env.SITE_URL}${port}/payments/status`,
        mobileNumber: mobileNo,
        paymentInstrument: {
            type: "PAY_PAGE"
        }
    };

    const base64EncPayLoad = Buffer.from(JSON.stringify(payload)).toString("base64");
    const checksum = sha256(base64EncPayLoad + payEndPoint + SALT_KEY) + "###" + SALT_KEY_INDEX;
    //console.log(base64EncPayLoad + " SEPARATOR "+ checksum);

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
        const resp = await axios(options);
        const result = resp.data;
        //console.log(result);
        if (result.success) {
            const url = result.data.instrumentResponse.redirectInfo.url;
            //res.json({ success: true, url: url });
            res.redirect(302, url);
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

export default pgRouter;