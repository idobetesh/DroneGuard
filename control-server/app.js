const dgram = require('dgram');
const app = require('express')();
const cors = require('cors');

app.use(cors());

const http = require('http').Server(app);
const io = require('socket.io')(http, { cors: { origin: '*' } });
const _ = require('lodash');
const SerialPort = require('serialport/lib');
const SerialPortParser = require('@serialport/parser-readline/lib');
const GPS = require('gps');

const DroneGuardUtils = require('./utils/droneguard-util.js');
const TA = require('./algorithm/transformation-algorithm.js');

const port = new SerialPort('/dev/ttyS0', { baudRate: 9600 });
const gps = new GPS();

const parser = port.pipe(new SerialPortParser());

/* Consts */
const STATE_PORT = 8890;
const UDP_PORT = 8889;
const TELLO_IP = '192.168.10.1';
const SERVER_PORT = 3002;
// const OvservationPoint = {
//     lat: 32.0933349,
//     lon: 34.7878746
// }; // Basketball Court outside Yarin's house.
const OvservationPoint = {
    lat: 32.093325,
    lon: 34.7910924
}; // Basketball Court In Irony daled.

let coordinate = { lat: 0, lon: 0 };

const drone = dgram.createSocket('udp4');
drone.bind(UDP_PORT);

const droneState = dgram.createSocket('udp4');
droneState.bind(STATE_PORT);

drone.on('message', (message) => {
    console.log(`🚁 : ${message}`);
    io.sockets.emit('status', message.toString());
});

// `Wake up` command
drone.send(
    'command',
    0,
    'command'.length,
    UDP_PORT,
    TELLO_IP,
    DroneGuardUtils.handleError
);
// Set Tello stream off
drone.send(
    'streamoff',
    0,
    'streamoff'.length,
    UDP_PORT,
    TELLO_IP,
    DroneGuardUtils.handleError
);
// Get current battery level
drone.send(
    'battery?',
    0,
    'battery?'.length,
    UDP_PORT,
    TELLO_IP,
    DroneGuardUtils.handleError
);

io.on('connection', (socket) => {
    // Sends a single command (right, left, up, down)
    socket.on('command', (command) => {
        console.log(`${command} command sent from browser`);
        drone.send(
            command,
            0,
            command.length,
            UDP_PORT,
            TELLO_IP,
            DroneGuardUtils.handleError
        );
    }),
    // Sends commands when a point is pressed
    socket.on('pressData', async (data) => {
        const commands = TA.droneMovementByBearing(data.coordinate, data.height);
        console.log(`Calculated bulk commands:\n${JSON.stringify(commands)}`);

        for (const command of commands) {
            const cmd = `${command.direction} ${command.distance}`;
            drone.send(
                cmd,
                0,
                cmd.length,
                UDP_PORT,
                TELLO_IP,
                DroneGuardUtils.handleError
            );

            await DroneGuardUtils.sleep(
                DroneGuardUtils.commandDelays[command.direction]
            );
        }
    });
    // Send take off command and navigates to Ovservation Point
    socket.on('takeoff', async () => {
        const src_cord = getCoords();
        const commands = TA.takeOffCommand(src_cord, OvservationPoint);
        console.log(`Calculated bulk commands:\n${JSON.stringify(commands)}`);

        for (const command of commands) {
            const cmd = `${command.direction} ${command.distance}`;
            drone.send(
                cmd,
                0,
                cmd.length,
                UDP_PORT,
                TELLO_IP,
                DroneGuardUtils.handleError
            );

            await DroneGuardUtils.sleep(
                DroneGuardUtils.commandDelays[command.direction]
            );
        }
    });

    socket.emit('status', 'CONNECTED');
});

droneState.on(
    'message',
    _.throttle((state) => {
        const formattedState = DroneGuardUtils.parseState(state.toString());
        io.sockets.emit('dronestate', formattedState);
    }, 100)
);

http.listen(SERVER_PORT, () => {
    console.log(
        `Socket io server up and running on http://localhost:${SERVER_PORT}`
    );
    DroneGuardUtils.visualPromt();
});

const getCoords = () => {
    if (coordinate.lat > 0 && coordinate.lon > 0) {
        return coordinate;
    }
};

gps.on('data', async (data) => {
    if (data.type == 'GGA') {
        if (data.quality != null) {
            DroneGuardUtils.sleep(1000);
            const { lat, lon } = data;
            coordinate = { lat, lon };
        } else {
            console.log('no gps fix available');
        }
    }
});

parser.on('data', (data) => {
    // eslint-disable-next-line
  try {
        gps.update(data);
    } catch (error) {
        throw error;
    }
});
