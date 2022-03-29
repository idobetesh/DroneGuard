const GeographicLib = require('geographiclib');

/* Consts */
const PI = Math.PI;
const ScreenLength = 640;
const ScreenWidth = 480;
const FocalLength = 3.61; // camera
const SensorWidth = 6.16; // camera
const SensorLength = 4.62; // camera


// Calculates alpha/beta angle.
// Return value: alpha/beta angle.
const calculateAlphaBeta = (sensor) => {
  const angle = 2 * (Math.atan(sensor / (2 * FocalLength)));
  const degrees = angle * (180 / PI);

  return angle;
};

const getRealDimension = (sensorMeasure, height) => {
  const angle = calculateAlphaBeta(sensorMeasure);
  const tan = (Math.tan(angle / 2));
  const sizeInMeters = (2 * height) * tan;

  return sizeInMeters;
};

const realSizeScreenSize = (real, screen) => {
  return real / screen;
};

const calculateBearing = (a, b) => {
  const angle = (Math.atan2(a, b) * (180 / PI));
  console.log(`bearing`, angle);
  return angle;
};

const getEndPoint = (lat1, lon1, bearing, dist) => {
  const geod = new GeographicLib.Geodesic.Geodesic(6378137, 1 / 298.257223563);
  const direction = geod.Direct(lat1, lon1, bearing, dist);

  return direction;
};

const droneMovement = (pressedPoint, height) => {
  //calculates the widht/length in meters caought by the camera.
  const Wr = getRealDimension(SensorWidth, height);
  const Lr = getRealDimension(SensorLength, height);

  // calculates the conversion for pixels per meter.
  const ConW = realSizeScreenSize(Wr, ScreenWidth);
  const ConL = realSizeScreenSize(Lr, ScreenLength);

  // find the (x,y) center of the screen.
  const centerX = ScreenWidth / 2;
  const centerY = ScreenLength / 2;

  let moveX = Math.round((pressedPoint.x - centerX) * ConW);
  let moveY = Math.round((pressedPoint.y - centerY) * ConL);

  // TODO implement move > 500 option
  // moves = [{ direction: 'some-command', distance: Number (cm) }]

  const moves = [];

  if (moveX > 0) {
    if (moveX < 20) {
      moveX = 20;
      moves.push({ direction: 'right', distance: moveX });
    }
    else if (moveX > 500) {
      moves.push({ direction: 'right', distance: moveX });
      moveX -= 500;
      moves.push({ direction: 'right', distance: moveX });
    } else {
      moves.push({ direction: 'right', distance: moveX });
    }
  }
  else if (moveX < 0) {
    if (moveX > -20) {
      console.log('im too smalllll', moveX)
      moveX = 20;
      // moveX = -moveX;
      moves.push({ direction: 'left', distance: moveX });
    }
    else if (moveX < -500) {
      moveX = -moveX;
      moves.push({ direction: 'left', distance: 500 });
      moveX -= 500;
      moves.push({ direction: 'left', distance: moveX });
    } else {
      moveX = -moveX;
      moves.push({ direction: 'left', distance: moveX });
    }
  }


  if (moveY > 0) {
    if (moveY < 20) {
      moveY = 20;
      moves.push({ direction: 'back', distance: moveY });
    }
    else if (moveY > 500) {
      moves.push({ direction: 'back', distance: 500 });
      moveY -= 500;
      moves.push({ direction: 'back', distance: moveY });
    } else {
      moves.push({ direction: 'back', distance: moveY });
    }
  }
  if (moveY < 0) {
    if (moveY > -20) {
      moveY = -20;
      moveY = -moveY;
      moves.push({ direction: 'forward', distance: moveY });
    }
    else if (moveY < -500) {
      moveY = -moveY;
      moves.push({ direction: 'forward', distance: 500 });
      moveY -= 500;
      moves.push({ direction: 'forward', distance: moveY });
    } else {
      moveY = -moveY;
      moves.push({ direction: 'forward', distance: moveY });
    }
  }

  return moves;
};

const deg2rad = (deg) => {
  return deg * (PI / 180)
};

const getDistanceFromLatLonInCm = (curr, dest) => {
  const R = 6371; // Radius of the earth in km

  const dLat = deg2rad(dest.lat - curr.lat);
  const dLon = deg2rad(dest.lon - curr.lon);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(curr.lat)) * Math.cos(deg2rad(dest.lat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  let distance = Math.round((R * c) * 100000); // distance in cm
  if (distance > 500) distance = 500;

  return `forward ${distance}`;
};


exports.droneMovement = droneMovement;
exports.getDistanceFromLatLonInCm = getDistanceFromLatLonInCm;