const app = require('express')();
require('dotenv').config();
const DroneGuardRoutes = require('./api/routes/droneGuard').router

const port = process.env.PORT || 3000;

app.use('/', DroneGuardRoutes);

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));

module.exports = app; // for testing