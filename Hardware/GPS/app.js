const SerialPort = require("serialport");
const SerialPortParser = require("@serialport/parser-readline");
const GPS = require("gps");
const Request = require("request-promise");

const port = new SerialPort('/dev/ttyS0', {baudRate: 9600});
const gps = new GPS();

const parser = port.pipe(new SerialPortParser());

gps.on("data", async data => {
	if(data.type == "GGA") {
        if(data.quality != null) {
            console.log( " [" + data.lat + ", " + data.lon + "]");
        } else {
            console.log("no gps fix available");
        }
}});
parser.on("data", data => {
	try {
        gps.update(data);
    } catch (e) {
        throw e;
    }
});