const asyncHandler = require('express-async-handler');

const Beach = require('../models/beach.js');

/**
 * Create new beach
 *
 * @param {String} name
 * @param {String} city 
 * @returns {Object} The created beach
 * @throws Will throw an error on failure
 */
const createBeach = asyncHandler(async (name, city) => {
    const beach = await Beach.create({ name, city });

    return beach;
});

/**
 * Get all beaches according to admin/user permissions
 * 
 * @param {Object} user
 * @returns {Array} contains all beaches
 * @throws Will throw an error on failure
 */
const getBeaches = asyncHandler(async (user) => {
    const { userType, id } = user;
    let beaches;
    if (userType === 'Admin') {
        beaches = await Beach.find();
    } else {
        beaches = await Beach.find({ user: id });
    }

    return beaches;
});

/**
 * Get specific beach by name
 *
 * @returns {Array} array of all beaches with the given name
 * @throws Will throw an error on failure
 */
 const getBeachByName = asyncHandler(async (name) => {
    const results = await Beach.find({ name });

    return results;
});

/**
 * Delete beach
 * 
 * @param {String} name of sepecific beach to delete
 * @returns {Array} array of all beaches
 * @throws Will throw an error on failure
 */
const deleteBeach = asyncHandler(async (id) => {
    const results = await Beach.findOneAndDelete({ id });

    return results;
});


exports.getBeaches = getBeaches;
exports.getBeachByName = getBeachByName;
exports.createBeach = createBeach;
exports.deleteBeach = deleteBeach;