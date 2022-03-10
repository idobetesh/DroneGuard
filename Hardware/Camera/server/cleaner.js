const findRemoveSync = require('find-remove')

setInterval(() => {
    // var result = findRemoveSync('./stream', { age: { seconds: 30 }, extensions: '.ts' });
    var result = findRemoveSync('./home/pi/DroneGuard/Hardware/Camera/video/ipcam', { age: { seconds: 30 }, extensions: '.ts' });
    console.log(result);
}, 5000);