const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { StatusCodes: HttpStatus } = require('http-status-codes');

const UserMapper = require('../mappers/user-mapper.js');

const authMiddleware = asyncHandler(async (req, res, next) => {
    let token = null;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            /* note - req.headers.authorization => `Bearer <some token>` */
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await UserMapper.getUserById(decoded.id);

            next();

        } catch (error) {
            console.error(error);
            res.status(HttpStatus.UNAUTHORIZED);

            throw new Error('Not authorized');
        }
    }

    if (!token) {
        res.status(HttpStatus.UNAUTHORIZED);
        
        throw new Error('Missing bearer token');
    }
});


module.exports = { authMiddleware };
