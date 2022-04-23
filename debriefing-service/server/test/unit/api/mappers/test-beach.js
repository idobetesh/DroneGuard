const Sinon = require('sinon');
const Assert = require('chai').use(require('chai-as-promised')).assert;

const beach = require('../../../../api/models/beach.js');
const BeachMapper = require('../../../../api/mappers/beach-mapper.js');
const { defaultBeaches } = require('../../../../api/utils/beach-default-data.js');

const sandbox = Sinon.createSandbox();

describe('beach-mapper 🏖', () => {
    const mockName = 'some-beach';
    const mockCity = 'some-city';
    const mockBeaches = defaultBeaches.beaches;

    afterEach(() => {
        sandbox.restore();
    });

    describe('getBeaches', () => {
        it('Should succeed (returns all beaches)', async () => {
            const findStub = sandbox.stub(beach, 'find').returns(Promise.resolve(mockBeaches));

            const beaches = await BeachMapper.getBeaches();

            Assert.isNotNull(beaches);
            Assert.equal(findStub.callCount, 1);
            Assert.equal(beaches, mockBeaches);
        });
        it('Should fail (DB error)', async () => {
            sandbox.stub(beach, 'find').throws(new Error('DB error'));
            await Assert.isRejected(BeachMapper.getBeaches(), /DB error/);
        });
    });

    describe('createBeach', () => {
        it('Should succeed (create a beach)', async () => {
            const createStub = sandbox.stub(beach, 'create').returns(Promise.resolve(mockBeaches));

            const createdBeaches = await BeachMapper.createBeach(mockName, mockCity);

            Assert.equal(createStub.callCount, 1);
            Assert.isNotNull(createdBeaches);
            Assert.equal(createStub.args[0][0].city, mockCity);
            Assert.equal(createStub.args[0][0].name, mockName);
        });
        it('Should fail (missing beach name)', async () => {
            sandbox.stub(beach, 'create').returns(Promise.reject());

            await Assert.isRejected(BeachMapper.createBeach(null, mockCity));
        });
        it('Should fail (DB error)', async () => {
            sandbox.stub(beach, 'create').throws(new Error('DB error'));
            await Assert.isRejected(BeachMapper.createBeach(), /DB error/);
        });
    });

    describe('deleteBeach', () => {
        it('Should succeed (delete a beach)', async () => {
            const currentBeachesNumber = mockBeaches.length;
            const deleteStub = sandbox.stub(beach, 'findOneAndDelete').returns(Promise.resolve(mockBeaches));

            const beachNameToDelete = mockBeaches[0].name;
            const beaches = await BeachMapper.deleteBeach(beachNameToDelete);

            beaches.shift();
            Assert.isNotNull(beaches);
            Assert.equal(deleteStub.callCount, 1);
            Assert.equal(beaches.length, currentBeachesNumber - 1);
        });
        it('Should fail (no beach name)', async () => {
            sandbox.stub(beach, 'findOneAndDelete').returns(Promise.reject());

            await Assert.isRejected(BeachMapper.deleteBeach(null, mockCity));
        });
        it('Should fail (DB error)', async () => {
            sandbox.stub(beach, 'findOneAndDelete').throws(new Error('DB error'));
            await Assert.isRejected(BeachMapper.deleteBeach(mockName), /DB error/);
        });
    });
});
