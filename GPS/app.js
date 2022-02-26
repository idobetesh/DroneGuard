const SreialPort = require('serialport');
const SreialPortParser = require('@serialport/parser-readline');
const GPS = require('gps');
const Request = require('request');
const { SerialPort } = require('serialport');

const port = new SerialPort('/dev/tty50', { baudRate: 9600 });
const gps = new GPS();

const parser = port.pipe(new SreialPortParser());

parser.on('data', data => {
    console.log(data);
});