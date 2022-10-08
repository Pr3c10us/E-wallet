// Import needed dependencis
const axios = require('axios');
const Refund = require('../models/refundModel');

const refund = async (id, data, res) => {
    // Create required headers
    const headers = {
        authorization: `Bearer ${process.env.paystack_secret}`,
        'cache-control': 'no-cache',
        'content-type': 'application/json',
    };

    // Send refund post request with required headers
    const { data: refundData } = await axios.post(
        `https://api.paystack.co/refund`,
        {
            transaction: id,
            amount: data.data.amount,
        },
        {
            headers: headers,
        }
    );

    // Create object from the refund data and save it to the Refund model
    const refundObj = {
        TransactionId: refundData.data.transaction.id,
        Amount: refundData.data.transaction.amount,
        Email: data.data.customer.email,
    };

    // If refund fails send error message
    if (!refundData.status) {
        refundObj.Status = 'failed';
        await Refund.create(refundObj);
        return res.status(200).json({
            msg: `Your email is not registerd and we failed to refund your funds right now, Don't worry we will get back to you soon and refund your funds`,
        });
    } else {
        refundObj.Status = 'success';
        await Refund.create(refundObj);
        return res.json({
            msg: `Your email is not registerd so we are refunding your funds`,
        });
    }
};

module.exports = refund;
