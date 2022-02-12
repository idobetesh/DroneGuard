const { StatusCodes: HttpStatus } = require('http-status-codes');
const BeachMapper = require('../mappers/beach-mapper.js');


const createBeach = async (req, res) => {
    const { name } = req.body;
    let results;
    if (name) {
        try {
            results = await BeachMapper.createBeach(name);
        } catch {
            console.log(error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
        }
    } else {
        res.status(HttpStatus.BAD_REQUEST).json({ message: 'Bad request' });
    }

    res.status(HttpStatus.CREATED).send(results);
};

const getBeaches = async (req, res) => {
    let results;
    try {
        results = await BeachMapper.getBeaches();
    } catch (error) {
        console.error(error);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }

    res.status(HttpStatus.OK).send(results);
};

const deleteBeach = async (req, res) => {
    const { name } = req.body;
    let results;
    if (name) {
        try {
            results = await BeachMapper.deleteBeach(name);
        } catch (error) {
            console.error(error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
        }
    } else {
        res.status(HttpStatus.BAD_REQUEST).json({ message: 'Bad request' });
    }

    res.status(HttpStatus.OK).send(results);
};


exports.getBeaches = getBeaches;
exports.createBeach = createBeach;
exports.deleteBeach = deleteBeach;