const { StatusCodes: HttpStatus } = require('http-status-codes');
const LifeguardMapper = require('../mappers/lifeguard-mapper.js');

const createLifeguard = async (req, res) => {
    const { name } = req.body;
    let results;
    if (name) {
        try {
            results = await LifeguardMapper.createLifeguard(name);
        } catch {
            console.log(error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
        }
    } else {
        res.status(HttpStatus.BAD_REQUEST).json({ message: 'Bad request' });
    }

    res.status(HttpStatus.CREATED).send(results);
};

const getLifeguards = async (req, res) => {
    let results;
    try {
        results = await LifeguardMapper.getLifeguards();
    } catch (error) {
        console.error(error);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }

    res.status(HttpStatus.OK).send(results);
};

const deleteLifeguard = async (req, res) => {
    const { name } = req.body;
    let results;
    if (name) {
        try {
            results = await LifeguardMapper.deleteLifeguard(name);
        } catch (error) {
            console.error(error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
        }
    } else {
        res.status(HttpStatus.BAD_REQUEST).json({ message: 'Bad request' });
    }

    res.status(HttpStatus.OK).send(results);
};


exports.getLifeguards = getLifeguards;
exports.createLifeguard = createLifeguard;
exports.deleteLifeguard = deleteLifeguard;