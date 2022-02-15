const loggerMiddleware = (req, res, next) => {
    const startTime = new Date();
    const userConnected = req.user ? true : false;

    const logData = {
        method: req.method,
        url: req.url,
        ...userConnected && { user: req.user.id }
    };

    console.log(`[logger ${startTime.toLocaleString()}]: ${JSON.stringify(logData)}`);

    next();
};

module.exports = { loggerMiddleware };


