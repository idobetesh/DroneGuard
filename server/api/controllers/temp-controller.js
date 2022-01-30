const { StatusCodes: HttpStatus } = require('http-status-codes');


const tempFunction = (req, res) => {
    res.status(HttpStatus.OK).json({message: 'Hello Droneuard 🚁'});
};

exports.tempFunction = tempFunction;