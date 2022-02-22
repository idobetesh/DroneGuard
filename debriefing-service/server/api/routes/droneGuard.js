const express = require('express');

const UserController = require('../controllers/user-controller.js')
const BeachController = require('../controllers/beach-controller.js')
const RecordController = require('../controllers/record-controller.js')

const { loggerMiddleware } = require('../middlewares/logger-middleware.js');
const { authMiddleware } = require('../middlewares/auth-middleware.js');

const Middlewares = [authMiddleware, loggerMiddleware];
const router = express.Router();


/* User Endpoints */
router.post('/api/user/register', loggerMiddleware, UserController.registerUser);
router.post('/api/user/login', loggerMiddleware, UserController.loginUser);
router.get('/api/user', Middlewares, UserController.getCurrentUser);

/* Beach Endpoints */
router.get('/api/beach', Middlewares, BeachController.getBeaches);
router.post('/api/beach', Middlewares, BeachController.createBeach);
router.delete('/api/beach/:id', Middlewares, BeachController.deleteBeach);

/* Record Endpoints */
router.get('/api/record', Middlewares, RecordController.getRecords);
router.post('/api/record', Middlewares, RecordController.createRecord);
router.post('/api/record/:id/note', Middlewares, RecordController.addRecordNote);
router.delete('/api/record/:id', Middlewares, RecordController.deleteRecord);


exports.router = router;