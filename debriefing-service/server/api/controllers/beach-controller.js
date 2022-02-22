const asyncHandler = require('express-async-handler');
const { StatusCodes: HttpStatus } = require('http-status-codes');

const BeachMapper = require('../mappers/beach-mapper.js');


const createBeach = asyncHandler(async (req, res) => {
    const { name, city } = req.body;
    let results;
    if (name && city) {
        try {
            results = await BeachMapper.createBeach(name, city);
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR);
            throw error;
        }
    } else {
        res.status(HttpStatus.BAD_REQUEST);
        throw new Error('Some fields are missing');
    }

    res.status(HttpStatus.CREATED).send(results);
});

const getBeaches = asyncHandler(async (req, res) => {
    let results;
    try {
        results = await BeachMapper.getBeaches(req.user);
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        throw error;
    }

    res.status(HttpStatus.OK).send(results);
});

const deleteBeach = asyncHandler(async (req, res) => {
    const { id } = req.params;
    let results;
    if (id) {
        try {
            results = await BeachMapper.deleteBeach(id);
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR);
            throw error;
        }
    } else {
        res.status(HttpStatus.BAD_REQUEST).json({ message: 'Bad request' });
    }

    res.status(HttpStatus.OK).send(results);
});


exports.getBeaches = getBeaches;
exports.createBeach = createBeach;
exports.deleteBeach = deleteBeach;
