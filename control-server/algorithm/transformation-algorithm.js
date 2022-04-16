const GeographicLib = require('geographiclib');

/* Consts */
const PI = Math.PI;
const ScreenLength = 1944;
const ScreenWidth = 2592;
const FocalLength = 3.6; // camera
const SensorWidth = 3.673; // camera
// const SensorWidth = 6.16; // camera
const SensorLength = 2.738; // camera
// const SensorLength = 4.62; // camera

/* Calculates alpha/beta angle. */
/* Return value: alpha/beta angle. */
const calculateAlphaBeta = (sensor) => {
  const angle = 2 * Math.atan(sensor / (2 * FocalLength));
  const degrees = angle * (180 / PI);

  return angle;
};

//This function calculates the real width and length dimentions caught by the camera.
const getRealDimension = (sensorMeasure, height) => {
  const angle = calculateAlphaBeta(sensorMeasure);
  const tan = Math.tan(angle / 2);
  const sizeInMeters = 2 * height * tan;

  return sizeInMeters;
};

//This function caculates the scale of pixels to meter.
const realSizeScreenSize = (real, screen) => {
  return real / screen;
};

//Calculates the drone bearing for the drone movement.
const calculateBearing = (a, b) => {
  const angle = Math.atan2(a, b) * (180 / PI);

  return angle;
};

//This functions parameters are source lat,lon,bearing and distance and returns the destination coordinates.
const getEndPoint = (lat1, lon1, bearing, dist) => {
  const geod = new GeographicLib.Geodesic.Geodesic(6378137, 1 / 298.257223563);
  const direction = geod.Direct(lat1, lon1, bearing, dist);

  return direction;
};

//This function receives the X,Y coordinates and drone height
// and returns a list of movements that the drone needs to make.
//This functions includes drone rotation.
const droneMovementByBearing = (pressedPoint, height) => {
  //calculates the width/length in meters caought by the camera.
  const Wr = getRealDimension(SensorWidth, height);
  const Lr = getRealDimension(SensorLength, height);
  // calculates the conversion for pixels per meter.
  const ConW = realSizeScreenSize(Wr, ScreenWidth);
  const ConL = realSizeScreenSize(Lr, ScreenLength);

  // find the (x,y) center of the screen.
  const centerX = ScreenWidth / 2;
  const centerY = ScreenLength / 2;

  let moveX = Math.round((pressedPoint.x * 4 - centerX) * ConW);
  let moveY = Math.round((pressedPoint.y * 4 - centerY) * ConL);

  // moves = [{ direction: 'some-command', distance: Number (cm) }]
  const moves = [];

  let angle = Math.round(calculateBearing(moveY, moveX));
  let totalMove = Math.round((moveX ** 2 + moveY ** 2) ** 0.5);

  if (moveX > 0 && moveY < 0) {
    moves.push({ direction: 'cw', distance: angle });
  } else if (moveX > 0 && moveY > 0) {
    angle += 90;
    moves.push({ direction: 'cw', distance: angle });
  } else if (moveX < 0 && moveY > 0) {
    angle += 180;
    moves.push({ direction: 'cw', distance: angle });
  } else if (moveX < 0 && moveY < 0) {
    angle += 270;
    moves.push({ direction: 'cw', distance: angle });
  }

  if (totalMove > 500) {
    while (totalMove > 500) {
      moves.push({ direction: 'forward', distance: 500 });
      totalMove -= 500;
    }
  } 
  
  moves.push({
    direction: 'forward',
    distance: totalMove < 20 ? 20 : totalMove,
  });

  moves.push({ direction: 'ccw', distance: angle });

  return pushDescendAndAscend(moves);
};

//This function receives the X,Y coordinates and drone height
// and returns a list of movements made through X axis and then Y axis.
//This functions doesn't include drone rotation.
const droneMovement = (pressedPoint, height) => {
  //calculates the width/length in meters caought by the camera.
  const Wr = getRealDimension(SensorWidth, height);
  const Lr = getRealDimension(SensorLength, height);

  // calculates the conversion for pixels per meter.
  const ConW = realSizeScreenSize(Wr, ScreenWidth);
  const ConL = realSizeScreenSize(Lr, ScreenLength);

  // find the (x,y) center of the screen.
  const centerX = ScreenWidth / 2;
  const centerY = ScreenLength / 2;

  let moveX = Math.round((pressedPoint.x * 4 - centerX) * ConW);
  let moveY = Math.round((pressedPoint.y * 4 - centerY) * ConL);

  // moves = [{ direction: 'some-command', distance: Number (cm) }]
  const moves = [];

  if (moveX > 0) {
    if (moveX < 20) {
      moves.push({ direction: 'right', distance: 20 });
    } else if (moveX > 500) {
      moves.push({ direction: 'right', distance: 500 });
      moveX -= 500;
      moves.push({ direction: 'right', distance: moveX < 20 ? 20 : moveX });
    } else {
      moves.push({ direction: 'right', distance: moveX });
    }
  } else if (moveX < 0) {
    if (moveX > -20) {
      moves.push({ direction: 'left', distance: 20 });
    } else if (moveX < -500) {
      moves.push({ direction: 'left', distance: 500 });
      moveX = -moveX;
      moveX -= 500;
      moves.push({ direction: 'left', distance: moveX < 20 ? 20 : moveX });
    } else {
      moves.push({ direction: 'left', distance: -moveX });
    }
  }

  if (moveY > 0) {
    if (moveY < 20) {
      moves.push({ direction: 'back', distance: 20 });
    } else if (moveY > 500) {
      moves.push({ direction: 'back', distance: 500 });
      moveY -= 500;
      moves.push({ direction: 'back', distance: moveY < 20 ? 20 : moveY });
    } else {
      moves.push({ direction: 'back', distance: moveY });
    }
  } else if (moveY < 0) {
    if (moveY > -20) {
      moves.push({ direction: 'forward', distance: 20 });
    } else if (moveY < -500) {
      moves.push({ direction: 'forward', distance: 500 });
      moveY = -moveY;
      moveY -= 500;
      moves.push({ direction: 'forward', distance: moveY < 20 ? 20 : moveY });
    } else {
      moves.push({ direction: 'forward', distance: -moveY });
    }
  }

  return pushDescendAndAscend(moves);
};

//converts degrees to radians.
const deg2rad = (deg) => {
  return deg * (PI / 180);
};

//converts radians to degrees.
const rad2deg = (rad) => {
  var PI = Math.PI;
  return rad * (180 / PI);
};

//given two coordinates, this functions will return the bearing direction.
const calculateBearingBetweenCoordinates = (src, dest) => {
  dL = dest.lon - src.lon;

  X = Math.cos(dest.lat) * Math.sin(dL);
  Y =
    Math.cos(src.lat) * Math.sin(dest.lat) -
    Math.sin(src.lat) * Math.cos(dest.lat) * Math.cos(dL);

  bearing = rad2deg(Math.atan2(X, Y));

  return Math.round((bearing + 360) % 360);
};

//Given two coordinates this function will return the distance in cm.
const getDistanceBetweenTwoCoordinates = (curr, dest) => {
  moves = [];
  const R = 6371; // Radius of the earth in km

  const dLat = deg2rad(dest.lat - curr.lat);
  const dLon = deg2rad(dest.lon - curr.lon);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(curr.lat)) *
      Math.cos(deg2rad(dest.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  // Pushing rotation to the move commands.
  const rotate = calculateBearingBetweenCoordinates(curr, dest);
  moves.push({ direction: 'cw', distance: rotate });

  let distance = Math.round(R * c * 100000); // distance in cm

  console.log(`distance`, distance);
  if (distance > 500) {
    while (distance > 500) {
      moves.push({ direction: 'forward', distance: 500 });
      distance -= 500;
    }
    moves.push({ direction: 'forward', distance: distance });
  } else {
    moves.push({ direction: 'forward', distance: distance });
  }
  moves.push({ direction: 'ccw', distance: rotate });

  return moves;
};

/* for each generated commands bulk add descend and ascend */
const pushDescendAndAscend = (commands) => {
  const cm = 200;
  commands.push({ direction: 'down', distance: cm }); // descend for better view
  commands.push({ direction: 'up', distance: cm }); // return to the same height as before

  return commands;
};


exports.droneMovement = droneMovement;
exports.droneMovementByBearing = droneMovementByBearing;
exports.pushDescendAndAscend = pushDescendAndAscend;
exports.getDistanceBetweenTwoCoordinates = getDistanceBetweenTwoCoordinates;
exports.calculateBearingBetweenCoordinates = calculateBearingBetweenCoordinates;
