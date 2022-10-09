const verifyAccountNumber = (res, req) => {
    res.status(200).json({
        msg: 'Account number verified',
    });
};

const initiateExternalTransfer = (res, req) => {
    res.status(200).json({
        msg: 'Transfer initiated',
    });
};

module.exports = {
    verifyAccountNumber,
    initiateExternalTransfer,
};
