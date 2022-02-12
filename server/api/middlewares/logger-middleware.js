const loggerMiddleware = (req, res, next) => {
    const startTime = new Date();
    const logData = {
        method: req.method,
        url: req.url
    };

    console.log(`[logger ${startTime.toLocaleString()}]: ${JSON.stringify(logData)}`);

    next();
};

module.exports = { loggerMiddleware };


