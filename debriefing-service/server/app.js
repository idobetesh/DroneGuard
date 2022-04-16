const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const { StatusCodes: HttpStatus } = require('http-status-codes');

const DroneGuardRoutes = require('./api/routes/droneGuard').router;
const { errorHandlerMiddleware } = require('./api/middlewares/error-handler-middleware.js');
const DroneGuardUtils = require('./api/utils/droneguard-utils.js');
const Database = require('./api/db/database.js');

require('dotenv').config();

const port = process.env.PORT || 3001;

DroneGuardUtils.visualPromt();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors()); 

Database.connect();

app.use('/', DroneGuardRoutes);

app.use(errorHandlerMiddleware);

app.all('/*', (req, res) => {
    res.status(HttpStatus.NOT_FOUND).json({ message: 'Nothing in here..🧐' });
});

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));


module.exports = app; // for testing
