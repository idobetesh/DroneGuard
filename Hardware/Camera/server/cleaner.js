const findRemoveSync = require('find-remove')

setInterval(() => {
    const result = findRemoveSync('./videos/ipcam', { age: { seconds: 30 }, extensions: '.ts' });
    console.log(result);
}, 5000);