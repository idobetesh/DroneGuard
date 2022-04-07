
const Sinon = require('sinon');
const Assert = require('chai').use(require('chai-as-promised')).assert;
const Uuid = require('uuid').v4;

const beach = require('../../api/models/beach.js');
const BeachMapper = require('../../api/mappers/beach-mapper.js');
const { defaultBeaches } = require('../../api/utils/beach-default-data.js');

const sandbox = Sinon.createSandbox();

describe('beach-mapper 🏖', () => {
    const mockUser = {
        id: Uuid(),
        name: 'some-name',
        email: 'some-email@dg.com',
        userType: 'Admin'
    };

    const mockBeaches = defaultBeaches.beaches;

    afterEach(() => {
        sandbox.restore();
    });

    describe('getBeaches', () => {
        it('Should succeed (returns all Beaches)', async () => {
            const findStub = sandbox.stub(beach, 'find').returns(Promise.resolve(mockBeaches));

            const beaches = await BeachMapper.getBeaches();

            Assert.isNotNull(beaches);
            Assert.deepEqual(findStub.args, [[]]);
            Assert.equal(findStub.callCount, 1);
            Assert.equal(beaches, mockBeaches);
        });
        it('Should fail (DB error)', async () => {
            sandbox.stub(beach, 'find').throws(new Error('DB error'));
            await Assert.isRejected(BeachMapper.getBeaches(), /DB error/);
        });
    });

});