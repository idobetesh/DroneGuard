/*
 * DroneGuard app holds default beaches in which LG can work and record videos. 
 * This file contains all of these beaches and is responsible to push them into the DroneGuard debriefing system DB.
 */

const defaultBeaches = {
    _beaches: [{
        name: 'Yamit',
        city: 'Haifa'
    }, {
        name: 'Poleg',
        city: 'Netanya'
    }, {
        name: 'Hasharon',
        city: 'Herzliya'
    }, {
        name: 'Gordon',
        city: 'Tel Aviv'
    }, {
        name: 'Frishman',
        city: 'Tel Aviv'
    }, {
        name: 'Nitzanim',
        city: 'Ashkelon'
    }, {
        name: 'Dugit',
        city: 'Kineret'
    }],

    get beaches() { return this._beaches; }
};


exports.defaultBeaches = defaultBeaches;
