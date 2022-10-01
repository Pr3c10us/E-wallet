const errorHandler = (error, req, res, next) => {
    res.status(500).json({ msg: 'Internal Error' });
};

module.exports = errorHandler;
