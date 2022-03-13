const findRemoveSync = require('find-remove');

setInterval(() => {
    const result = findRemoveSync('/home/pi/DroneGuard/Hardware/Camera/video/ipcam', { age: { seconds: 30 }, extensions: '.ts' });
    console.log(result);
}, 5000);