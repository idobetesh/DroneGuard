const GeographicLib = require('geographiclib');

/* Consts */
const PI = Math.PI;
const ScreenLength = 2992;
const ScreenWidth = 3992;

const Height = 228.851; // drone
const FocalLength = 3.61; // camera
const SensorWidth = 6.16; // camera
const SensorLength = 4.62; // camera


// Calculates alpha/beta angle.
// Return value: alpha/beta angle.
const calculateAlphaBeta = (sensor) => {
  // console.log(`sensor`, sensor);
  const angle = 2 * (Math.atan(sensor / (2 * FocalLength)));
  const degrees = angle * (180 / PI);
  // console.log(`degrees`, degrees);
  return angle;
};

const getRealDimension = (sensorMeasure, h) => {
  const angle = calculateAlphaBeta(sensorMeasure);
  const tan = (Math.tan(angle / 2));
  // console.log(`tan`, tan);
  const sizeInMeters = (2 * h) * tan;
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

const xMovement = (screenCoord, height) => {
  const Wr = getRealDimension(SensorWidth, height);
  const ConW = realSizeScreenSize(Wr, ScreenWidth);
  const center_x = ScreenWidth / 2;
  let move_x = Math.round((screenCoord.x - center_x) * ConW);
  if (move_x > 500) move_x = 500;
  if (move_x > 0) {
    move_x = (`right ${move_x}`);
  } else {
    move_x = -move_x;
    move_x = (`left ${move_x}`);
  }

  return move_x;
}

const yMovement = (screenCoord, height) => {
  const Lr = getRealDimension(SensorLength, height);
  const ConL = realSizeScreenSize(Lr, ScreenLength);
  const center_y = ScreenLength / 2;
  let move_y = Math.round((screenCoord.y - center_y) * ConL);
  if (move_y > 500) move_y = 500;

  if (move_y > 0) {
    move_y = (`back ${move_y}`);
  } else {
    move_y = -move_y;
    move_y = (`forward ${move_y}`);
  }

  return move_y;
}

const droneMovement = (screenCoord, height) => {
  //calculates the widht/length in meters caought by the camera.
  const Wr = getRealDimension(SensorWidth, height);
  const Lr = getRealDimension(SensorLength, height);

  // calculates the conversion for pixels per meter.
  const ConW = realSizeScreenSize(Wr, ScreenWidth);
  const ConL = realSizeScreenSize(Lr, ScreenLength);

  // find the (x,y) center of the screen.
  const center_x = ScreenWidth / 2;
  const center_y = ScreenLength / 2;

  let move_x = Math.round((screenCoord.x - center_x) * ConW);
  let move_y = Math.round((screenCoord.y - center_y) * ConL);

  // TODO cover cases when move > 500

  // moves: <Array<Object>> = [{ direction: 'some-command', distance: Number (cm) }]
  const moves = [];

  if (move_x > 0) {
    if (move_x < 20) move_x = 20;
    moves.push({ direction: 'right', distance: move_x });
  } else {
    if (move_x > -20) move_x = -20;
    move_x = -move_x;
    moves.push({ direction: 'left', distance: move_x });
  }

  if (move_y > 0) {
    if (move_y < 20) move_y = 20;
    moves.push({ direction: 'back', distance: move_y });
  } else {
    if (move_y > -20) move_y = -20;
    move_y = -move_y;
    moves.push({ direction: 'forward', distance: move_y });
  }

  return moves;
};


// const droneMovement = (dest_x, dest_y, curr_lat, curr_lon) => {
//   //calculates the widht/length in meters caought by the camera.
//   const Wr = getRealDimension(SensorWidth);
//   const Lr = getRealDimension(SensorLength);

//   // calculates the conversion for pixels per meter.
//   const ConW = realSizeScreenSize(Wr, ScreenWidth);
//   const ConL = realSizeScreenSize(Lr, ScreenLength);

//   // find the (x,y) center of the screen.
//   const center_x = ScreenWidth / 2;
//   const center_y = ScreenLength / 2;

//   const move_x = (dest_x - center_x) * ConW;
//   const move_y = (dest_y - center_y) * ConL;

//   let angle = calculateBearing(move_y, move_x);
//   angle = (angle + 270) % 360
//   console.log(`bearing output`, angle);

//   const totalMove = (move_x ** 2 + move_y ** 2) ** 0.5;
//   console.log(`total_move`, totalMove);

//   const newLocation = getEndPoint(curr_lat, curr_lon, angle, totalMove);
//   const { lon2, lat2 } = newLocation;

//   return [lat2, lon2];
// };

const getDistanceFromLatLonInKm = (curr, dest) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(dest.lat - curr.lat);  // deg2rad below
  const dLon = deg2rad(dest.lon - curr.lon);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(curr.lat)) * Math.cos(deg2rad(dest.lat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = Math.round((R * c) * 100000); // Distance in cm

  if (d > 500) d = 500;

  console.log('distance is:', d)

  return `forward ${d}`;
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180)
};


const currCoordinate = { lat: 1.28168, lon: 103.86389 };
// const destCoordinate = droneMovement(1775, 825, currCoordinate.lat, currCoordinate.lon);
// const xdest = xMovement()
// console.log(destCoordinate);
export default droneMovement;

// exports.droneMovement = droneMovement;
// exports.xMovement = xMovement;
// exports.yMovement = yMovement;
