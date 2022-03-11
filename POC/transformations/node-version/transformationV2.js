const fs = require('fs');
const piexif = require('piexifjs');
const GeographicLib = require('geographiclib');


const getBase64DataFromJpegFile = filename => fs.readFileSync(filename).toString('binary');
const getExifFromJpegFile = filename => piexif.load(getBase64DataFromJpegFile(filename));

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

const getRealDimension = (sensorMeasure) => {
  const angle = calculateAlphaBeta(sensorMeasure);
  const tan = (Math.tan(angle / 2));
  // console.log(`tan`, tan);
  const sizeInMeters = (2 * Height) * tan;
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

const droneMovement = (dest_x, dest_y, curr_lat, curr_lon) => {
  //calculates the widht/lenth in meters caought by the camera.
  const Wr = getRealDimension(SensorWidth);
  const Lr = getRealDimension(SensorLength);

  // calculates the conversion for pixels per meter.
  const ConW = realSizeScreenSize(Wr, ScreenWidth);
  const ConL = realSizeScreenSize(Lr, ScreenLength);

  // find the (x,y) center of the screen.
  const center_x = ScreenWidth / 2;
  const center_y = ScreenLength / 2;

  const move_x = (dest_x - center_x) * ConW;
  const move_y = (dest_y - center_y) * ConL;

  let angle = calculateBearing(move_y, move_x);
  angle = (angle + 270) % 360
  console.log(`bearing output`, angle);

  const totalMove = (move_x ** 2 + move_y ** 2) ** 0.5;
  console.log(`total_move`, totalMove);

  const newLocation = getEndPoint(curr_lat, curr_lon, angle, totalMove);
  const { lon2, lat2 } = newLocation;

  return [lat2, lon2];
};

const currCoordinate = { lat: 1.28168, lon: 103.86389 };
const destCoordinate = droneMovement(1775, 825, currCoordinate.lat, currCoordinate.lon);
console.log(destCoordinate);
