const Record = require('../models/record.js');

/**
 * Create new record
 *
 * @param {String} url
 * @param {String} TBD
 * @returns {Object} The created lifeduard
 * @throws Will throw an error on failure
 */
const createRecord = async (url) => {
    const record = Record.create({ url });

    return record;
};

/**
 * Get all records
 * 
 * @returns {Array} contains all records
 * @throws Will throw an error on failure
 */
const getRecords = async (user) => {
    const { userType, id } = user;
    let results;
    if (userType === 'Admin') {
        results = await Record.find();
    } else {
        results = await Record.find({ user: id });
    }

    return results;
};

/**
 * Delete record given its id
 *
 * @param {String} id
 * @returns {Object} The deleted record
 * @throws Will throw an error on failure
 */
const deleteRecord = async (id) => {
    const results = await Record.findOneAndDelete({ id });

    return results;
};

/**
 * Add comment to specific record
 *
 * @param {String} id
 * @param {String} comment
 * @throws Will throw an error on failure
 */
const addRecordComment = async (id, comment) => {
    const newComment = {
        comment,
        date: Date.now()
    };

    let record = await Record.findById(id);
    record.comments.push(newComment);
    
    await record.save();
};


exports.addRecordComment = addRecordComment;
exports.getRecords = getRecords;
exports.createRecord = createRecord;
exports.deleteRecord = deleteRecord;