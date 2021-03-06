const TA = require('../algorithm/transformation-algorithm.js');
const DroneGuardUtils = require('../utils/droneguard-util.js');

describe('DroneGuard Navigation and Control 🚁', () => {
    const fakeCurr = { lat: 32.093128, lon: 34.787805 };
    const fakeDest = { lat: 32.093194898476746, lon: 34.78780385430309 };
    const curr = { lat: 32.093692, lon: 34.78811 };
    const dest = { lat: 32.093508, lon: 34.78809 };

    const fakeHeigth = 300;
    const decsendAcsendFixedHeight = 200;

    describe('droneMovement', () => {
        it('Should succeed (return a 4 moves array)', () => {
            expect(TA.droneMovement({ x: 400, y: 500 }, fakeHeigth)).toEqual([
                { direction: 'right', distance: 36 },
                { direction: 'back', distance: 121 },
                { direction: 'down', distance: decsendAcsendFixedHeight },
                { direction: 'up', distance: decsendAcsendFixedHeight }
            ]);
        });
        it('Should succeed (return a 4 moves array)', () => {
            expect(TA.droneMovement({ x: 100, y: 100 }, fakeHeigth)).toEqual([
                { direction: 'left', distance: 106 },
                { direction: 'forward', distance: 67 },
                { direction: 'down', distance: decsendAcsendFixedHeight },
                { direction: 'up', distance: decsendAcsendFixedHeight }
            ]);
        });
        it('Should succeed (return a 4 moves array)', () => {
            expect(TA.droneMovement({ x: 480, y: 480 }, fakeHeigth)).toEqual([
                { direction: 'right', distance: 74 },
                { direction: 'back', distance: 111 },
                { direction: 'down', distance: decsendAcsendFixedHeight },
                { direction: 'up', distance: decsendAcsendFixedHeight }
            ]);
        });
        it('Should succeed (return a 4 moves array)', () => {
            expect(TA.droneMovement({ x: 0, y: 0 }, fakeHeigth)).toEqual([
                { direction: 'left', distance: 153 },
                { direction: 'forward', distance: 114 },
                { direction: 'down', distance: decsendAcsendFixedHeight },
                { direction: 'up', distance: decsendAcsendFixedHeight }
            ]);
        });
        it('Should succeed (return a 4 moves array)', () => {
            expect(TA.droneMovement({ x: 640, y: 300 }, 500)).toEqual([
                { direction: 'right', distance: 249 },
                { direction: 'back', distance: 45 },
                { direction: 'down', distance: decsendAcsendFixedHeight },
                { direction: 'up', distance: decsendAcsendFixedHeight }
            ]);
        });
        it('Should succeed (return a 4 moves array)', () => {
            expect(TA.droneMovement({ x: 200, y: 300 }, 600)).toEqual([
                { direction: 'left', distance: 117 },
                { direction: 'back', distance: 54 },
                { direction: 'down', distance: decsendAcsendFixedHeight },
                { direction: 'up', distance: decsendAcsendFixedHeight }
            ]);
        });
        it('Should succeed (return a 5 moves array)', () => {
            expect(TA.droneMovement({ x: 640, y: 300 }, 600)).toEqual([
                { direction: 'right', distance: 299 },
                { direction: 'back', distance: 54 },
                { direction: 'down', distance: decsendAcsendFixedHeight },
                { direction: 'up', distance: decsendAcsendFixedHeight }
            ]);
        });
        it('Should succeed (return a 5 moves array)', () => {
            expect(TA.droneMovement({ x: 0, y: 300 }, 600)).toEqual([
                { direction: 'left', distance: 306 },
                { direction: 'back', distance: 54 },
                { direction: 'down', distance: decsendAcsendFixedHeight },
                { direction: 'up', distance: decsendAcsendFixedHeight }
            ]);
        });
        it('Should succeed (return a 6 moves array)', () => {
            expect(TA.droneMovement({ x: 0, y: 480 }, 800)).toEqual([
                { direction: 'left', distance: 408 },
                { direction: 'back', distance: 297 },
                { direction: 'down', distance: decsendAcsendFixedHeight },
                { direction: 'up', distance: decsendAcsendFixedHeight }
            ]);
        });
    });

    describe('droneMovementByBearing', () => {
        it('Should succeed (return a 5 moves array with cw and ccw)', () => {
            expect(TA.droneMovementByBearing({ x: 400, y: 500 }, fakeHeigth)).toEqual(
                [
                    { direction: 'cw', distance: 163 },
                    { direction: 'forward', distance: 126 },
                    { direction: 'ccw', distance: 163 },
                    { direction: 'down', distance: 100 },
                    { direction: 'up', distance: 100 }
                ]
            );
        });
        it('Should succeed (return a 5 moves array with cw and ccw)', () => {
            expect(TA.droneMovementByBearing({ x: 100, y: 100 }, fakeHeigth)).toEqual(
                [
                    { direction: 'ccw', distance: 58 },
                    { direction: 'forward', distance: 125 },
                    { direction: 'cw', distance: 58 },
                    { direction: 'down', distance: 100 },
                    { direction: 'up', distance: 100 }
                ]
            );
        });
        it('Should succeed (return a 5 moves array with cw and ccw)', () => {
            expect(TA.droneMovementByBearing({ x: 0, y: 480 }, fakeHeigth)).toEqual([
                { direction: 'ccw', distance: 126 },
                { direction: 'forward', distance: 189 },
                { direction: 'cw', distance: 126 },
                { direction: 'down', distance: 100 },
                { direction: 'up', distance: 100 }
            ]);
        });
        it('Should succeed (return a 5 moves array with cw and ccw, more than 500)', () => {
            expect(TA.droneMovementByBearing({ x: 100, y: 0 }, 700)).toEqual([
                { direction: 'ccw', distance: 43 },
                { direction: 'forward', distance: 363 },
                { direction: 'cw', distance: 43 },
                { direction: 'down', distance: decsendAcsendFixedHeight },
                { direction: 'up', distance: decsendAcsendFixedHeight }
            ]);
        });
        it('Should succeed (return a 6 moves array with cw and ccw, more than 500 and less than 20)', () => {
            expect(TA.droneMovementByBearing({ x: 100, y: 0 }, 580)).toEqual([
                { direction: 'ccw', distance: 43 },
                { direction: 'forward', distance: 301 },
                { direction: 'cw', distance: 43 },
                { direction: 'down', distance: decsendAcsendFixedHeight },
                { direction: 'up', distance: decsendAcsendFixedHeight }
            ]);
        });
    });

    describe('pushDescendAndAscend', () => {
        const fakeCommands = [
            { direction: 'right', distance: 111 },
            { direction: 'forward', distance: 500 }
        ];

        it('Should succeed (return commands with decsend and acsend, 2 => 4)', () => {
            expect(TA.pushDescendAndAscend(fakeCommands)).toEqual([
                { direction: 'right', distance: 111 },
                { direction: 'forward', distance: 500 },
                { direction: 'down', distance: decsendAcsendFixedHeight },
                { direction: 'up', distance: decsendAcsendFixedHeight }
            ]);
        });
        it('Should succeed (return commands with decsend and acsend, 3 => 5)', () => {
            fakeCommands.pop();
            fakeCommands.pop();
            fakeCommands[0].direction = 'left';
            fakeCommands.push({ direction: 'forward', distance: 200 });

            expect(TA.pushDescendAndAscend(fakeCommands)).toEqual([
                { direction: 'left', distance: 111 },
                { direction: 'forward', distance: 500 },
                { direction: 'forward', distance: 200 },
                { direction: 'down', distance: decsendAcsendFixedHeight },
                { direction: 'up', distance: decsendAcsendFixedHeight }
            ]);
        });
    });
    describe('getDistanceBetweenTwoCoordinates', () => {
        it('Should succeed (return a forward command with distance greater than 500cm)', () => {
            expect(TA.getDistanceBetweenTwoCoordinates(fakeCurr, fakeDest)).toEqual([
                { direction: 'cw', distance: 359 },
                { direction: 'forward', distance: 500 },
                { direction: 'forward', distance: 244 },
                { direction: 'ccw', distance: 359 }
            ]);
        });
        it('Should succeed (return a forward command with distance greater than 500cm)', () => {
            expect(TA.getDistanceBetweenTwoCoordinates(curr, dest)).toEqual([
                { direction: 'cw', distance: 185 },
                { direction: 'forward', distance: 500 },
                { direction: 'forward', distance: 500 },
                { direction: 'forward', distance: 500 },
                { direction: 'forward', distance: 500 },
                { direction: 'forward', distance: 55 },
                { direction: 'ccw', distance: 185 }
            ]);
        });
    });

    describe('calculateBearingBetweenCoordinates', () => {
        it('Should succeed return the bearing angle of the drone.)', () => {
            expect(TA.calculateBearingBetweenCoordinates(fakeCurr, fakeDest)).toEqual(359);
        });
    });

    describe('parseState', () => {
        let fakeState = 'pitch:%d;roll:%d;yaw:%d;vgx:%d;vgz:%d;templ:%d;temph:%d;tof:%d;h:%d;bat:%d;baro:%.2f;time:%d;agx:%.2f;agy:%.2f;agz:%.2f';
        it('Should succeed (return an object with drone state information)', () => {
            expect(DroneGuardUtils.parseState(fakeState)).toEqual({
                pitch: '%d',
                roll: '%d',
                yaw: '%d',
                vgx: '%d',
                vgz: '%d',
                templ: '%d',
                temph: '%d',
                tof: '%d',
                h: '%d',
                bat: '%d',
                baro: '%.2f',
                time: '%d',
                agx: '%.2f',
                agy: '%.2f',
                agz: '%.2f'
            });
        });
        it('Should succeed (empty state)', () => {
            fakeState = ';';
            expect(DroneGuardUtils.parseState(fakeState)).toEqual({});
        });
    });
    describe('takeOffCommand', () => {
        it('Should succeed (return a takeoff command rotation movement and rotations again)', () => {
            expect(TA.takeOffCommand(fakeCurr, fakeDest)).toEqual([
                { direction: 'up', distance: 400 },
                { direction: 'cw', distance: 359 },
                { direction: 'forward', distance: 500 },
                { direction: 'forward', distance: 244 },
                { direction: 'ccw', distance: 359 }
            ]);
        });
    });

});