var HMC5883L = require('compass-hmc5883l');

// Connect with the HMC5883L compass on i2c bus number 2
var compass = new HMC5883L(1);

// Get the compass values between x and y.  Heading is returned in degrees.
compass.getHeadingDegrees('x', 'y', function (err, heading) {
    console.log(heading);
});

// The following reading will return {x, y, z} values in milli Tesla:
compass.getRawValues(function (err, vals) {
    console.log(vals);
});
