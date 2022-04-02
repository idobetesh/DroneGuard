const { droneMovement, getDistanceFromLatLonInCm } = require('../algorithm/transformation-algorithm.js');

describe('DroneGuard Navigation and Control 🚁', () => {
    const fakeCurr = { lat: 32.093128, lon: 34.787805 };
    const fakeDest = { lat: 32.093194898476746, lon: 34.78780385430309 };
    const fakeHeigth = 300;

    describe('droneMovement', () => {
        it('Should succeed (return a 2 moves array)', () => {
            expect(droneMovement({ x: 400, y: 500 }, fakeHeigth)).toEqual([
                { direction: 'right', distance: 60 },
                { direction: 'back', distance: 204 }
            ]);
        });
        it('Should succeed (return a 2 moves array)', () => {
            expect(droneMovement({ x: 100, y: 100 }, fakeHeigth)).toEqual([
                { direction: 'left', distance: 177 },
                { direction: 'forward', distance: 113 }
            ]);
        });
        it('Should succeed (return a 2 moves array)', () => {
            expect(droneMovement({ x: 480, y: 480 }, fakeHeigth)).toEqual([
                { direction: 'right', distance: 124 },
                { direction: 'back', distance: 188 }
            ]);
        });
        it('Should succeed (return a 2 moves array)', () => {
            expect(droneMovement({ x: 0, y: 0 }, fakeHeigth)).toEqual([
                { direction: 'left', distance: 257 },
                { direction: 'forward', distance: 193 }
            ]);
        });
        it('Should succeed (return a 3 moves array)', () => {
            expect(droneMovement({ x: 640, y: 300 }, 500)).toEqual([
                { direction: 'right', distance: 417 },
                { direction: 'back', distance: 75 }
            ]);
        });
        it('Should succeed (return a 2 moves array)', () => {
            expect(droneMovement({ x: 200, y: 300 }, 600)).toEqual([
                { direction: 'left', distance: 196 },
                { direction: 'back', distance: 90 }
            ]);
        });
        it('Should succeed (return a 3 moves array)', () => {
            expect(droneMovement({ x: 640, y: 300 }, 600)).toEqual([
                { direction: 'right', distance: 500 },
                { direction: 'right', distance: 20 },
                { direction: 'back', distance: 90 }
            ]);
        });
        it('Should succeed (return a 3 moves array)', () => {
            expect(droneMovement({ x: 0, y: 300 }, 600)).toEqual([
                { direction: 'left', distance: 500 },
                { direction: 'left', distance: 20 },
                { direction: 'back', distance: 90 }
            ]);
        });
        it('Should succeed (return a 4 moves array)', () => {
            expect(droneMovement({ x: 0, y: 480 }, 800)).toEqual([
                { direction: 'left', distance: 500 },
                { direction: 'left', distance: 184 },
                { direction: 'back', distance: 500 },
                { direction: 'back', distance: 20 }
            ]);
        });
    });

    describe('getDistanceFromLatLonInCm', () => {
        it('Should succeed (return a forward command with distance greater than 500cm)', () => {
            expect(getDistanceFromLatLonInCm(fakeCurr, fakeDest)).toEqual('forward 500');
        });
    });
});