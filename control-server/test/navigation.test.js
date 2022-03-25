const { droneMovement, getDistanceFromLatLonInCm } = require('../algorithm/transformation-algorithm.js');

describe('DroneGuard Navigation and Control 🚁', () => {
    const fakeCurr = { lat: 32.093128, lon: 34.787805 };
    const fakeDest = { lat: 32.093194898476746, lon: 34.78780385430309 };
    const fakeHeigth = 300;

    describe('droneMovement', () => {
        it('Should succeed (return a moves array)', () => {
            expect(droneMovement({ x: 2700, y: 340 }, fakeHeigth)).toEqual([
                { direction: 'right', distance: 69 },
                { direction: 'forward', distance: 113 }
            ]);
        });
        it('Should succeed (return a moves array)', () => {
            expect(droneMovement({ x: 100, y: 100 }, fakeHeigth)).toEqual([
                { direction: 'left', distance: 185 },
                { direction: 'forward', distance: 137 }
            ]);
        });
    });

    describe('getDistanceFromLatLonInCm', () => {
        it('Should succeed (return a forward command with distance greater than 500cm)', () => {
            expect(getDistanceFromLatLonInCm(fakeCurr, fakeDest)).toEqual('forward 500');
        });
    });
});