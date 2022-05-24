import io from 'socket.io-client';

/* url to control server (runs on RP) */
const socket = io('http://192.168.10.4:3002');

export default socket;
