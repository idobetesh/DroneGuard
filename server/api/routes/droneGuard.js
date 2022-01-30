const express = require('express');
const { StatusCodes: HttpStatus } = require('http-status-codes');
const TempController = require('../controllers/temp-controller.js')

const router = express.Router();

router.get('/api/all', TempController.tempFunction);

exports.router = router;