
const Sinon = require('sinon');
const Assert = require('chai').use(require('chai-as-promised')).assert;
const HttpMocks = require('node-mocks-http');
const { StatusCodes: HttpStatus } = require('http-status-codes');

const HealthController = require('../../../../api/controllers/health-controller.js');
const Database = require('../../../../api/db/database.js');

const sandbox = Sinon.createSandbox();

describe('health-controller ⛑', () => {
    let req, res;

    beforeEach(() => {
        req = HttpMocks.createRequest({
            'method': 'GET',
            'url': '/api/health'
        });
        res = HttpMocks.createResponse();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('getHealth', () => {
        it('should succeed (getHealth returns Ok)', async () => {
            const mockResponse = {
                "service": "DroneGuard",
                "timestamp": "23/03/2022, 12:41:02",
                "status": "Ok",
                "database": {
                    "name": "DroneGuard-DB",
                    "status": "Ok"
                }
            };

            sandbox.stub(Database, 'getDbHealth').returns(mockResponse);

            await HealthController.getHealth(req, res);
            Assert.equal(res.statusCode, HttpStatus.OK);

            const data = JSON.parse(res._getData());

            Assert.equal(data.status, 'Ok');
            Assert.equal(data.database.status.status, 'Ok');
        });
        it('should succeed (getHealth returns bad)', async () => {
            const mockResponse = {
                "service": "DroneGuard",
                "timestamp": "23/03/2022, 12:41:02",
                "status": "Bad",
                "database": {
                    "name": "DroneGuard-DB",
                    "status": "Bad"
                }
            };

            sandbox.stub(Database, 'getDbHealth').returns(mockResponse);

            await HealthController.getHealth(req, res);
            Assert.equal(res.statusCode, HttpStatus.OK);
        });
        it('should fail (getHealth throws exception)', async () => {
            sandbox.stub(Database, 'getDbHealth').throws(new Error('DB error'));

            Assert.isRejected(HealthController.getHealth(req, res), /DB error/);
        });
    });
});