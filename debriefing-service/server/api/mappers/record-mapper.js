const asyncHandler = require('express-async-handler');

const Record = require('../models/record.js');

/**
 * Create new record
 *
 * @param {String} url
 * @param {String} thumbnailUrl
 * @param {String} TBD
 * @param {Object} user 
 * @returns {Object} The created lifeduard
 * @throws Will throw an error on failure
 */
const createRecord = asyncHandler(async (url, thumbnailUrl, user) => {
    const record = await Record.create({ url, thumbnailUrl, user: user.id });

    return record;
});

/**
 * Get all records according to admin/user permissions
 * 
 * @param {Object} user
 * @returns {Array} contains all records [sorted by date]
 * @throws Will throw an error on failure
 */
const getRecords = asyncHandler(async (user) => {
    const { userType, id } = user;
    let records;

    if (userType === 'Admin') {
        records = await Record.find();
    } else {
        records = await Record.find({ user: id });
    }

    records.sort((recordA, recordB) => {
        return recordA.createdAt - recordB.createdAt;
    });

    return records;
});

/**
 * Delete record given its id
 *
 * @param {String} id
 * @returns {Object} The deleted record
 * @throws Will throw an error on failure
 */
const deleteRecord = asyncHandler(async (id) => {
    const results = await Record.findOneAndDelete(id);

    return results;
});

/**
 * Add note to a specific record
 *
 * @param {String} id
 * @param {String} note
 * @throws Will throw an error on failure
 */
const addRecordNote = asyncHandler(async (id, note) => {
    let record = await Record.findById(id);
    record.note = note;

    await record.save();
});


exports.addRecordNote = addRecordNote;
exports.getRecords = getRecords;
exports.createRecord = createRecord;
exports.deleteRecord = deleteRecord;
