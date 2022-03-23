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
  //calculates the widht/length in meters caought by the camera.
  const Wr = getRealDimension(SensorWidth);
  const Lr = getRealDimension(SensorLength);

  // calculates the conversion for pixels per meter.
  const ConW = realSizeScreenSize(Wr, ScreenWidth);
  const ConL = realSizeScreenSize(Lr, ScreenLength);

  // find the (x,y) center of the screen.
  const center_x = ScreenWidth / 2;
  const center_y = ScreenLength / 2;

  let move_x = Math.round((dest_x - center_x) * ConW);
  let move_y = Math.round((dest_y - center_y) * ConL);

  let move = [];
  if(move_x > 0){
    move.push(`right ${move_x}`);
  }else{
    move_x = -move_x;
    move.push(`left ${move_x}`);
  }

  if(move_y > 0){
    move.push(`back ${move_y}`);
  }else{
    move_y = -move_y;
    move.push(`forward ${move_y}`);
  }

  // let angle = calculateBearing(move_y, move_x);
  // angle = (angle + 270) % 360
  // console.log(`bearing output`, angle);

  // const totalMove = (move_x ** 2 + move_y ** 2) ** 0.5;
  // console.log(`total_move`, totalMove);

  // const newLocation = getEndPoint(curr_lat, curr_lon, angle, totalMove);
  // const { lon2, lat2 } = newLocation;

  return move;
  // return [lat2, lon2];
};

function getDistanceFromLatLonInKm(curr, dest) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(dest.lat - curr.lat);  // deg2rad below
  var dLon = deg2rad(dest.lon - curr.lon); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = (R * c)*1000; // Distance in m

  return d;
}



const currCoordinate = { lat: 1.28168, lon: 103.86389 };
const destCoordinate = droneMovement(2775, 425, currCoordinate.lat, currCoordinate.lon);
console.log(destCoordinate);
