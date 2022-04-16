const { StatusCodes: HttpStatus } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res) => {
    const statusCode =  res.statusCode ? res.statusCode : HttpStatus.INTERNAL_SERVER_ERROR;

    res.status(statusCode);

    res.json({
        message: err.message,
        stack: err.stack
    });
};


module.exports = { errorHandlerMiddleware };
