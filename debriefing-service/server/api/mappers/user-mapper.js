const asyncHandler = require('express-async-handler');

const User = require('../models/user.js');


/**
 * Get user by email
 * 
 * @param {String} email
 * @returns {Object} user
 * @throws Will throw an error on failure
 */
const getUserByEmail = asyncHandler(async (email) => {
    const user = await User.findOne({ email });

    return user;
});

/**
 * Get user by id
 * 
 * @param {String} id
 * @returns {Object} user (password excluded)
 * @throws Will throw an error on failure
 */
const getUserById = asyncHandler(async (id) => {
    const user = await User.findById(id).select('-password');

    return user;
});

/**
 * Create new user (on registration process)
 * 
 * @param {String} email
 * @param {String} password
 * @param {String} name
 * @param {String} userType
 * @returns {Object} user (password excluded)
 * @throws Will throw an error on failure
 */
const createUser = asyncHandler(async (email, password, name, userType) => {
    const user = await User.create({ email, password, name, userType });

    return { id: user.id, name: user.name, email: user.email };
});

/**
 * Add new beach to beaches array
 * 
 * @param {Object} user
 * @param {String} beach id
 * @throws Will throw an error on failure
 */
 const addBeach = asyncHandler(async (user, beach) => {
    const { id } = user;
    let currentUser = await User.findById(id);
    currentUser.beaches.push(beach);
    
    await currentUser.save();
});


exports.getUserById = getUserById;
exports.getUserByEmail = getUserByEmail;
exports.createUser = createUser;
exports.addBeach = addBeach;
