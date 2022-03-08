const fs = require('fs');
const piexif = require('piexifjs');
const { stringify } = require('querystring');
var GeographicLib = require("geographiclib");
var geod = GeographicLib.Geodesic.WGS84;


const getBase64DataFromJpegFile = filename => fs.readFileSync(filename).toString('binary');
const getExifFromJpegFile = filename => piexif.load(getBase64DataFromJpegFile(filename));


// const exif = getExifFromJpegFile("Images/39081697872_536d8bd641_o.jpg")


ScreenLength = 2992;
ScreenWidth = 3992;

Height = 228.851;
FocalLength = 3.61;
SensorWidth = 6.16;
SensorLength = 4.62;


function calculate_alpha_beta(sensor) {
  // console.log(`sensor`, sensor);
  var angle = 2 * (Math.atan(sensor / (2 * FocalLength)));

  var pi = Math.PI;
  var degrees = angle * (180 / pi);
  // console.log(`degrees`, degrees);
  return angle;
}

function get_real_length() {
  var pi = Math.PI;
  beta = calculate_alpha_beta(SensorLength);

  tan = (Math.tan(beta /2));
  // console.log(`tan`, tan);
  Lr = (2*Height)*tan;
  // console.log(`Lr`, Lr);
  return Lr;
}

function get_real_width() {
  var pi = Math.PI;
  alpah = calculate_alpha_beta(SensorWidth);

  tan = (Math.tan(alpah /2));
  // console.log(`tan`, tan);
  Wr = (2*Height)*tan;
  // console.log(`Wr`, Lr);
  return Wr;
}


function realSize_screenSize(real, screen){
  return real/screen;
}

function calculate_bearing(a,b){
  var pi = Math.PI;
  angle = (Math.atan2(a,b)* (180/pi));
  // console.log(`bearing`, angle);
  return angle;
}

function get_endPoint(lat1, lon1, bearing, dist){
  // geod = Geodesic(geod.WGS84_a, geod.WGS84_f);
  var geod = new GeographicLib.Geodesic.Geodesic(6378137, 1/298.257223563);
  d = geod.Direct(lat1, lon1, bearing, dist);
  // console.log(d)

  return d;

}

function drone_movement(dest_x, dest_y, curr_lat, curr_lon){
  //calculates the widht/lenth in meters caought by the camera.
  Wr = get_real_width();
  Lr = get_real_length();

  // calculates the conversion for pixels per meter.
  ConW = realSize_screenSize(Wr, ScreenWidth);
  // console.log(`ConW`, ConW);
  ConL = realSize_screenSize(Lr, ScreenLength);
  // console.log(`ConL`, ConL);

  // find the (x,y) center of the screen.
  center_x = ScreenWidth/2;
  center_y = ScreenLength/2;
  // console.log(`center_x`, center_x);
  // console.log(`center_y`, center_y);

  move_x = (dest_x - center_x)*ConW;
  move_y = (dest_y - center_y)*ConL;
  // console.log(`move_x`, move_x);
  // console.log(`move_y`, move_y);

  var angle = calculate_bearing(move_y, move_x);
  angle = (angle + 270) % 360
  // console.log(`bearing output`, angle);

  total_move = (move_x**2 + move_y**2)**0.5;
  // console.log(`total_move`, total_move);


  new_location = get_endPoint(curr_lat, curr_lon, angle, total_move);
  // console.log("workss", new_location['lat2']);
  
  return `${new_location['lon2']} , ${new_location['lat2']}`;



}
console.log(drone_movement(1775, 825, 1.28168, 103.86389));



