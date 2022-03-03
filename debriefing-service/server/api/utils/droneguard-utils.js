const figlet = require('figlet');

/**
* @param {Number} ms miliseconds to sleep 
* @returns {Promise<Object>} resolve the timeout
*/
const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

/**
* @param {String} str to display
*/
const visualPromt = (str = '< DroneGuard / >') => {
    figlet(str, function (err, data) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(data);
    });
};

exports.sleep = sleep;
exports.visualPromt = visualPromt;
