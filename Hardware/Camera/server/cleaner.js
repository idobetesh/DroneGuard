const findRemoveSync = require('find-remove')

setInterval(() => {
<<<<<<< HEAD
    // var result = findRemoveSync('./stream', { age: { seconds: 30 }, extensions: '.ts' });
    var result = findRemoveSync('./home/pi/DroneGuard/Hardware/Camera/video/ipcam', { age: { seconds: 30 }, extensions: '.ts' });
=======
    const result = findRemoveSync('./videos/ipcam', { age: { seconds: 30 }, extensions: '.ts' });
>>>>>>> fdfae91d673630991f700d227d558536fc27d2cb
    console.log(result);
}, 5000);