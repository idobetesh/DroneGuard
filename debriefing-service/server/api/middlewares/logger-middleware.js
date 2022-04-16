const loggerMiddleware = (req, res, next) => {
    const startTime = new Date();

    const logData = {
        method: req.method,
        url: req.url,
        ...req.user && { user: req.user.id }
    };

    console.log(`[logger ${startTime.toLocaleString('en-GB')}]: ${JSON.stringify(logData)}`);

    next();
};


module.exports = { loggerMiddleware };
