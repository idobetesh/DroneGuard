const express = require('express');

const UserController = require('../controllers/user-controller.js')
const LifuguardController = require('../controllers/lifeguard-controller.js')
const BeachController = require('../controllers/beach-controller.js')
const RecordController = require('../controllers/record-controller.js')

const { loggerMiddleware } = require('../middlewares/logger-middleware.js');
const { protectMiddleware } = require('../middlewares/auth-middleware.js');

const router = express.Router();

const Middlewares = [loggerMiddleware, protectMiddleware];

/* User Endpoints */
router.get('/user', loggerMiddleware, UserController.getUser);
router.post('/login', Middlewares, UserController.loginUser);
router.post('/register', Middlewares, UserController.registerUser);

/* Lifuguard Endpoints */
router.get('/api/lifeguard', loggerMiddleware, LifuguardController.getLifeguards);
router.post('/api/lifeguard', loggerMiddleware, LifuguardController.createLifeguard);
router.delete('/api/lifeguard', loggerMiddleware, LifuguardController.deleteLifeguard);

/* Beach Endpoints */
router.get('/api/beach', loggerMiddleware, BeachController.getBeaches);
router.post('/api/beach', loggerMiddleware, BeachController.createBeach);
router.delete('/api/beach', loggerMiddleware, BeachController.deleteBeach);

/* Record Endpoints */
router.get('/api/record', loggerMiddleware, RecordController.getRecords);
router.post('/api/record', loggerMiddleware, RecordController.createRecord);
router.post('/api/record/comment', loggerMiddleware, RecordController.addRecordComment);
router.delete('/api/record', loggerMiddleware, RecordController.deleteRecord);


exports.router = router;