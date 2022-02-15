const express = require('express');

const UserController = require('../controllers/user-controller.js')
const LifuguardController = require('../controllers/lifeguard-controller.js')
const BeachController = require('../controllers/beach-controller.js')
const RecordController = require('../controllers/record-controller.js')

const { loggerMiddleware } = require('../middlewares/logger-middleware.js');
const { authMiddleware } = require('../middlewares/auth-middleware.js');

const Middlewares = [authMiddleware, loggerMiddleware];
const router = express.Router();


/* User Endpoints */
router.get('/user', Middlewares, UserController.getCurrentUser);
router.post('/login', loggerMiddleware, UserController.loginUser);
router.post('/register', loggerMiddleware, UserController.registerUser);

/* Lifuguard Endpoints */
router.get('/api/lifeguard', Middlewares, LifuguardController.getLifeguards);
router.post('/api/lifeguard', Middlewares, LifuguardController.createLifeguard);
router.delete('/api/lifeguard', Middlewares, LifuguardController.deleteLifeguard);

/* Beach Endpoints */
router.get('/api/beach', Middlewares, BeachController.getBeaches);
router.post('/api/beach', Middlewares, BeachController.createBeach);
router.delete('/api/beach', Middlewares, BeachController.deleteBeach);

/* Record Endpoints */
router.get('/api/record', Middlewares, RecordController.getRecords);
router.post('/api/record', Middlewares, RecordController.createRecord);
router.post('/api/record/comment', Middlewares, RecordController.addRecordComment);
router.delete('/api/record/:id', Middlewares, RecordController.deleteRecord);


exports.router = router;