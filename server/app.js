const app = require('express')();
const bodyParser = require('body-parser');
const DroneGuardRoutes = require('./api/routes/droneGuard').router;
const Database = require('./api/db/database.js');

require('dotenv').config();

const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', DroneGuardRoutes);

Database.connect();

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));


module.exports = app; // for testing