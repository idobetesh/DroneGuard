const asyncHandler = require('express-async-handler');
const { StatusCodes: HttpStatus } = require('http-status-codes');

const Database = require('../db/database.js');


const getHealth = asyncHandler(async (req, res) => {
    res.status(HttpStatus.OK).json({
        service: 'DroneGuard',
        timestamp: new Date().toLocaleString('en-GB'),
        status: 'Ok',
        database: {
            name: 'DroneGuard-DB',
            status: Database.getDbHealth()
        }
    });
});


exports.getHealth = getHealth;
