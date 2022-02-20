const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { StatusCodes: HttpStatus } = require('http-status-codes');

const UserMapper = require('../mappers/user-mapper.js');
const { ReasonPhrases } = require('http-status-codes');


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
};

const registerUser = asyncHandler(async (req, res) => {
    const { email, password, name, userType } = req.body;
    let newUser = null;

    if (!email || !password || !name || !userType) {
        res.status(HttpStatus.BAD_REQUEST);
        throw new Error('Some fields are missing');
    }

    const userExists = await UserMapper.getUserByEmail(email);

    if (userExists) {
        res.status(HttpStatus.BAD_REQUEST);
        throw new Error('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    newUser = await UserMapper.createUser(email, hashedPassword, name, userType);

    if (!newUser) {
        res.status(HttpStatus.BAD_REQUEST);
        throw new Error('Invalid user data');
    }

    if (newUser) {
        newUser.token = generateToken(newUser.id);
        res.status(HttpStatus.CREATED).send(newUser);
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await UserMapper.getUserByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            userType: user.userType,
            token: generateToken(user.id)
        });
    } else {
        res.status(HttpStatus.BAD_REQUEST);
        throw new Error('Invalid credentials');
    }
});

const getCurrentUser = asyncHandler(async (req, res) => {
    const id = req.user.id;
    const { _id, name, email, userType } = await UserMapper.getUserById(id);

    res.status(HttpStatus.OK).json({
        id: _id,
        name,
        email,
        userType
    });
});


exports.getCurrentUser = getCurrentUser;
exports.loginUser = loginUser;
exports.registerUser = registerUser;