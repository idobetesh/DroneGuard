const asyncHandler = require('express-async-handler');
const { StatusCodes: HttpStatus } = require('http-status-codes');

const RecordMapper = require('../mappers/record-mapper.js');
const UserMapper = require('../mappers/user-mapper');


const createRecord = asyncHandler(async (req, res) => {
    const { url, thumbnailUrl } = req.body;
    let results;
    if (url && thumbnailUrl) {
        try {
            results = await RecordMapper.createRecord(url, thumbnailUrl, req.user);
            await UserMapper.addBeach(req.user, results.id);
        } catch {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR);
            throw error;
        }
    } else {
        res.status(HttpStatus.BAD_REQUEST);
        throw new Error('Some fields are missing');
    }

    res.status(HttpStatus.CREATED).send(results);
});

const getRecords = asyncHandler(async (req, res) => {
    let results;
    try {
        results = await RecordMapper.getRecords(req.user);
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        throw error;
    }

    res.status(HttpStatus.OK).send(results);
});

const deleteRecord = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { user } = req;

    if (user.userType !== 'Admin') {
        res.status(HttpStatus.UNAUTHORIZED);
        throw new Error(`${user.userType} unauthorized to delete records!`);
    }

    let results;
    if (id) {
        try {
            results = await RecordMapper.deleteRecord(id);
        } catch (error) {
            throw new Error('Failed to delete record');
        }
    } else {
        res.status(HttpStatus.BAD_REQUEST);
        throw new Error('Some fields are missing');
    }

    res.status(HttpStatus.OK).send(results);
});

const addRecordComment = asyncHandler(async (req, res) => {
    const { id, comment } = req.body;
    let results;
    if (id && comment) {
        try {
            results = await RecordMapper.addRecordComment(id, comment);
        } catch (error) {
            throw new Error('Failed to add new comment');
        }
    } else {
        res.status(HttpStatus.BAD_REQUEST);
        throw new Error('Some fields are missing');
    }

    res.status(HttpStatus.CREATED).send(results);
});


exports.addRecordComment = addRecordComment;
exports.getRecords = getRecords;
exports.createRecord = createRecord;
exports.deleteRecord = deleteRecord;