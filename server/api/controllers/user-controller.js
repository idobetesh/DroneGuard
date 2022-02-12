const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { StatusCodes: HttpStatus } = require('http-status-codes');

const UserMapper = require('../mappers/user-mapper.js')


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
};

const registerUser = async (req, res) => {
    const { email, password, name, userType } = req.body;
    let newUser = null;
    if (!email || !password || !name || !userType) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: 'Bad request' });
    }
    try {
        if (await UserMapper.getUserById(email)) {
            res.status(HttpStatus.BAD_REQUEST).json({ message: 'User already exists' });
            throw new Error('User already exists');
        }
    
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        newUser = await UserMapper.createUser(email, hashedPassword, name, userType);
    
        if (!newUser) {
            res.status(HttpStatus.BAD_REQUEST).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error(error);
    }

    if (newUser) {
        newUser.token = generateToken(newUser.id);
        res.status(HttpStatus.CREATED).send(newUser);
    }

};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await UserMapper.getUserByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        });
    } else {
        res.status(HttpStatus.BAD_REQUEST).json({ message: 'Invalid credentials' });
    }
};

const getUser = async (req, res) => {
    const id = req.user.id;
    const { _id, name, email, userType } = await UserMapper.getUserById(id);

    res.status(HttpStatus.OK).json({
        id: _id,
        name,
        email
    });

};


exports.getUser = getUser;
exports.loginUser = loginUser;
exports.registerUser = registerUser;