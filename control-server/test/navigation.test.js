const { droneMovement, getDistanceFromLatLonInCm } = require('../algorithm/transformation-algorithm.js');

describe('DroneGuard Navigation and Control 🚁', () => {
    const fakeCurr = { lat: 32.093128, lon: 34.787805 };
    const fakeDest = { lat: 32.093194898476746, lon: 34.78780385430309 };
    const fakeHeigth = 300;

    describe('droneMovement', () => {
        it('Should succeed (return a 2 moves array)', () => {
            expect(droneMovement({ x: 400, y: 500 }, fakeHeigth)).toEqual([
                { direction: 'right', distance: 171 },
                { direction: 'back', distance: 108 }
            ]);
        });
        it('Should succeed (return a 2 moves array)', () => {
            expect(droneMovement({ x: 100, y: 100 }, fakeHeigth)).toEqual([
                { direction: 'left', distance: 149 },
                { direction: 'forward', distance: 132 }
            ]);
        });
        it('Should succeed (return a 2 moves array)', () => {
            expect(droneMovement({ x: 480, y: 480 }, fakeHeigth)).toEqual([
                { direction: 'right', distance: 256 },
                { direction: 'back', distance: 96 }
            ]);
        });
        it('Should succeed (return a 2 moves array)', () => {
            expect(droneMovement({ x: 0, y: 0 }, fakeHeigth)).toEqual([
                { direction: 'left', distance: 256 },
                { direction: 'forward', distance: 192 }
            ]);
        });
        it('Should succeed (return a 2 moves array)', () => {
            expect(droneMovement({ x: 680, y: 480 }, fakeHeigth)).toEqual([
                { direction: 'right', distance: 469 },
                { direction: 'back', distance: 96 }
            ]);
        });
    });

    describe('getDistanceFromLatLonInCm', () => {
        it('Should succeed (return a forward command with distance greater than 500cm)', () => {
            expect(getDistanceFromLatLonInCm(fakeCurr, fakeDest)).toEqual('forward 500');
        });
    });
});