const { droneMovement, getDistanceFromLatLonInCm } = require('../algorithm/transformation-algorithm.js');

describe('DroneGuard Navigation and Control 🚁', () => {
    const fakeCurr = { lat: 32.093128, lon: 34.787805 };
    const fakeDest = { lat: 32.093194898476746, lon: 34.78780385430309 };
    const fakeHeigth = 300;

    describe('droneMovement', () => {
        it('Should succeed (return a 2 moves array)', () => {
            expect(droneMovement({ x: 400, y: 500 }, fakeHeigth)).toEqual([
                { direction: 'right', distance: 64 },
                { direction: 'back', distance: 208 }
            ]);
        });
        it('Should succeed (return a 2 moves array)', () => {
            expect(droneMovement({ x: 100, y: 100 }, fakeHeigth)).toEqual([
                { direction: 'left', distance: 176 },
                { direction: 'forward', distance: 112 }
            ]);
        });
        it('Should succeed (return a 2 moves array)', () => {
            expect(droneMovement({ x: 480, y: 480 }, fakeHeigth)).toEqual([
                { direction: 'right', distance: 128 },
                { direction: 'back', distance: 192 }
            ]);
        });
        it('Should succeed (return a 2 moves array)', () => {
            expect(droneMovement({ x: 0, y: 0 }, fakeHeigth)).toEqual([
                { direction: 'left', distance: 256 },
                { direction: 'forward', distance: 192 }
            ]);
        });
        it('Should succeed (return a 3 moves array)', () => {
            expect(droneMovement({ x: 640, y: 300 }, 500)).toEqual([
                { direction: 'right', distance: 427 },
                { direction: 'back', distance: 80 }
            ]);
        });
        it('Should succeed (return a 2 moves array)', () => {
            expect(droneMovement({ x: 200, y: 300 }, 600)).toEqual([
                { direction: 'left', distance: 192 },
                { direction: 'back', distance: 96 }
            ]);
        });
        it('Should succeed (return a 3 moves array)', () => {
            expect(droneMovement({ x: 640, y: 300 }, 600)).toEqual([
                { direction: 'right', distance: 500 },
                { direction: 'right', distance: 12 },
                { direction: 'back', distance: 96 }
            ]);
        });
        it('Should succeed (return a 3 moves array)', () => {
            expect(droneMovement({ x: 0, y: 300 }, 600)).toEqual([
                { direction: 'left', distance: 500 },
                { direction: 'left', distance: 20 },
                { direction: 'back', distance: 96 }
            ]);
        });
        it('Should succeed (return a 4 moves array)', () => {
            expect(droneMovement({ x: 0, y: 480 }, 800)).toEqual([
                { direction: 'left', distance: 500 },
                { direction: 'left', distance: 183 },
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