const Lifeguard = require('../models/lifeguard.js');

/**
 * Create new lifeguard
 *
 * @param {String} name
 * @returns {Object} The created lifeduard
 * @throws Will throw an error on failure
 */
const createLifeguard = async (userId, name) => {
    const lifeguard = await Lifeguard.create({ userId, name });

    return lifeguard;
};

/**
 * Get all lifeguards
 * 
 * @returns {Array} contains all lifeguards
 * @throws Will throw an error on failure
 */
const getLifeguards = async () => {
    const results = await Lifeguard.find();

    return results;
};

/**
 * Delete lifeguard given his name
 *
 * @param {String} name
 * @returns {Object} The deleted lifeguard
 * @throws Will throw an error on failure
 */
const deleteLifeguard = async (name) => {
    const results = await Lifeguard.findOneAndDelete({ name });

    return results;
};

/**
 * Add new record to lifeguard records array
 * 
 * @param {String} lifeguardId
 * @param {String} recordId
 * @throws Will throw an error on failure
 */
 const addRecord = async (lifeguardId, recordId) => {
    let lifeguard = await Lifeguard.findById({ _id: lifeguardId });
    lifeguard.records.push({ recordId });

    await lifeguard.save();
};


exports.addRecord = addRecord;
exports.getLifeguards = getLifeguards;
exports.createLifeguard = createLifeguard;
exports.deleteLifeguard = deleteLifeguard;