const { StatusCodes: HttpStatus } = require('http-status-codes');
const RecordMapper = require('../mappers/record-mapper.js');


const createRecord = async (req, res) => {
    const { url } = req.body;
    let results;
    if (url) {
        try {
            results = await RecordMapper.createRecord(url);
        } catch {
            console.log(error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
        }
    } else {
        res.status(HttpStatus.BAD_REQUEST).json({ message: 'Bad request' });
    }

    res.status(HttpStatus.CREATED).send(results);
};

const getRecords = async (req, res) => {
    let results;
    try {
        results = await RecordMapper.getRecords(req.user);
    } catch (error) {
        console.error(error);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }

    res.status(HttpStatus.OK).send(results);
};

const deleteRecord = async (req, res) => {
    const { id } = req.body;
    let results;
    if (id) {
        try {
            results = await RecordMapper.deleteRecord(id);
        } catch (error) {
            console.error(error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
        }
    } else {
        res.status(HttpStatus.BAD_REQUEST).json({ message: 'Bad request' });
    }

    res.status(HttpStatus.OK).send(results);
};

const addRecordComment = async (req, res) => {
    const { id, comment } = req.body;
    let results;
    if (id && comment) {
        try {
            results = await RecordMapper.addRecordComment(id, comment);
        } catch (error) {
            console.error(error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
        }
    } else {
        res.status(HttpStatus.BAD_REQUEST).json({ message: 'Bad request' });
    }

    res.status(HttpStatus.OK).send(results);

};


exports.addRecordComment = addRecordComment;
exports.getRecords = getRecords;
exports.createRecord = createRecord;
exports.deleteRecord = deleteRecord;