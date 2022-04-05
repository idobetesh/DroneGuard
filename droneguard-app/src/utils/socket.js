import io from 'socket.io-client';

/* url to control server (runs on RP) */
const socket = io('http://192.168.10.3:3002');
// const socket = io('http://localhost:3002');

export default socket;
