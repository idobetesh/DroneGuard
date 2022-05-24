const SerialPort = require('serialport/lib');
const SerialPortParser = require('@serialport/parser-readline/lib');
const GPS = require('gps');

const port = new SerialPort('/dev/ttyS0', { baudRate: 9600 });
const gps = new GPS();

const parser = port.pipe(new SerialPortParser());


gps.on('data', async data => {
    if (data.type == 'GGA') {
        if (data.quality != null) {
            const { lat, lon } = data;
            console.log({ lat, lon });
        } else {
            console.log('no gps fix available');
        }
    }
});

parser.on('data', data => {
    // eslint-disable-next-line
    try {
        gps.update(data);
    } catch (error) {
        throw error;
    }
});

