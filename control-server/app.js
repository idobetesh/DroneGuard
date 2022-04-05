const dgram = require('dgram');
const app = require('express')();
const cors = require('cors');

app.use(cors());

const http = require('http').Server(app);
const io = require('socket.io')(http, { cors: { origin: '*' } });
const _ = require('lodash');

const DroneGuardUtils = require('./utils/droneguard-util.js');
const { droneMovement } = require('./algorithm/transformation-algorithm.js');

/* Consts */
const STATE_PORT = 8890;
const UDP_PORT = 8889;
const TELLO_IP = '192.168.10.1';
const SERVER_PORT = 3002;

const drone = dgram.createSocket('udp4');
drone.bind(UDP_PORT);

const droneState = dgram.createSocket('udp4');
droneState.bind(STATE_PORT);

drone.on('message', message => {
    console.log(`🚁 : ${message}`);
    io.sockets.emit('status', message.toString());
});

// `Wake up` command
drone.send('command', 0, 'command'.length, UDP_PORT, TELLO_IP, DroneGuardUtils.handleError);
// Set Tello stream off
drone.send('streamoff', 0, 'streamoff'.length, UDP_PORT, TELLO_IP, DroneGuardUtils.handleError);
// Get current battery level
drone.send('battery?', 0, 'battery?'.length, UDP_PORT, TELLO_IP, DroneGuardUtils.handleError);

io.on('connection', socket => {
    socket.on('command', command => {
        console.log(`${command} command sent from browser`);
        drone.send(command, 0, command.length, UDP_PORT, TELLO_IP, DroneGuardUtils.handleError);
    }),
    socket.on('pressData', async (data) => {
        const currentHeight = parseInt(data.height); // save in order to return to the same height after descending
        const commands = droneMovement(data.coordinate, data.height);

        commands.push({ command: 'down', direction: 200 }); // descend for better view 
        commands.push({ command: 'up', direction: currentHeight }); // return to the same height as before

        console.log(`Calculated bulk commands:\n${JSON.stringify(commands)}`);

        for (const command of commands) {
            const cmd = `${command.direction} ${command.distance}`;
            drone.send(cmd, 0, cmd.length, UDP_PORT, TELLO_IP, DroneGuardUtils.handleError);

            await DroneGuardUtils.sleep(DroneGuardUtils.commandDelays[command.direction]);
        }
    });

    socket.emit('status', 'CONNECTED');
});

droneState.on('message', _.throttle(state => {
    const formattedState = DroneGuardUtils.parseState(state.toString());
    io.sockets.emit('dronestate', formattedState);
}, 100));

http.listen(SERVER_PORT, () => {
    console.log(`Socket io server up and running on http://localhost:${SERVER_PORT}`);
    DroneGuardUtils.visualPromt();
});

