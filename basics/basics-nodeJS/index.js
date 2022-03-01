const dgram = require('dgram');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
// const io = require('socket.io').listen(server);
const throttle = require('lodash/throttle');

const DroneGuardUtil = require('./utils/droneguard-util');

const TELLO_IP = '192.168.10.1';
const UDP_PORT = 8889;
const STATE_PORT = 8890;
const SERVER_PORT = 3002;

const drone = dgram.createSocket('udp4');
drone.bind(UDP_PORT);

const droneState = dgram.createSocket('udp4');
droneState.bind(STATE_PORT);

drone.on('message', (message) => {
    console.log(`🤖 : ${message}`);
});

droneState.on('message', (state) => {
    console.log(`🤖 : ${JSON.stringify(
        DroneGuardUtil.parseState(
            state.toString()
        ))}`);
    //   io.sockets.emit('status', message.toString());
});

const commands = ['command', 'battery?']//, 'takeoff', 'land'];

const tsetFly = async () => {
    for (const command of commands) {
        const delay = DroneGuardUtil.commandDelays().command;
        console.log(`running command: ${command} | delay: ${delay}`);
        drone.send(command, 0, command.length, UDP_PORT, TELLO_IP, DroneGuardUtil.handleError);

        await DroneGuardUtil.sleep(delay);
    }
};

DroneGuardUtil.visualPromt('< DroneGuard / >');
tsetFly();


// io.on('connection', socket => {
//   socket.on('command', command => {
//     console.log('command Sent from browser');
//     console.log(command);
//     drone.send(command, 0, command.length, PORT, TELLO_IP, DroneGuardUtil.handleError);
//   });

//   socket.emit('status', 'CONNECTED');
// });

// droneState.on(
//   'message',
//   throttle(state => {
//     const formattedState = parseState(state.toString());
//     io.sockets.emit('dronestate', formattedState);
//   }, 100)
// );

// http.listen(6767, () => {
//   console.log('Socket io server up and running');
// });

// server.listen(PORT, () => console.log(`Controll server is running on http://localhost:${SERVER_PORT}`));