const jwt = require('jsonwebtoken');
const { StatusCodes: HttpStatus } = require('http-status-codes');
const UserMapper = require('../mappers/user-mapper.js');

const protectMiddleware = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // req.headers.authorization => `Bearer <some token>`
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await UserMapper.getUserById(decoded.id);

            next();

        } catch (error) {
            console.error(error);
            res.status(HttpStatus.UNAUTHORIZED);
        }
    }

    if (!token) {
        res.status(HttpStatus.UNAUTHORIZED);
    }
};

module.exports = { protectMiddleware };