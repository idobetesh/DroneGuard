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
const createBeach = asyncHandler(async (name) => {
    const beach = Beach.create({ name });

    return beach;
});

/**
 * Get all beaches
 *
 * @returns {Array} array of all beaches
 * @throws Will throw an error on failure
 */
const getBeaches = asyncHandler(async () => {
    const results = await Beach.find();

    return results;
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
const deleteBeach = asyncHandler(async (name) => {
    const results = await Beach.findOneAndDelete({ name });

    return results;
});


exports.getBeaches = getBeaches;
exports.getBeachByName = getBeachByName;
exports.createBeach = createBeach;
exports.deleteBeach = deleteBeach;