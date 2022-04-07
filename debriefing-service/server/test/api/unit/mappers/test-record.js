
const Sinon = require('sinon');
const Assert = require('chai').use(require('chai-as-promised')).assert;
const Uuid = require('uuid').v4;

const record = require('../../../../api/models/record.js');
const RecordMapper = require('../../../../api/mappers/record-mapper.js');

const sandbox = Sinon.createSandbox();

describe('record-mapper 🎥', () => {
    const mockUser = {
        id: Uuid(),
        name: 'some-name',
        email: 'some-email@dg.com',
        userType: 'Admin'
    };

    afterEach(() => {
        sandbox.restore();
    });

    const generateMockRecords = (size = 5) => {
        let results = [];
        for (let i = 0; i < size; i++) {
            results.push({
                url: `https://some-video-${i}.com`,
                user: Uuid(),
                beach: `some-beach-${i}`,
                thumbnailUrl: `https://some-video-${i}.com`,
                note: `some-note-${i}`
            });
        }

        return results;
    };

    describe('getRecords', () => {
        it('Should succeed (returns all records)', async () => {
            const mockResults = generateMockRecords();
            const findStub = sandbox.stub(record, 'find').returns(Promise.resolve(mockResults));

            const records = await RecordMapper.getRecords(mockUser);

            Assert.isNotNull(records);
            Assert.deepEqual(findStub.args, [[]]);
            Assert.equal(findStub.callCount, 1);
            Assert.equal(records, mockResults);
        });
        it('Should fail (no user)', async () => {
            const mockResults = generateMockRecords();
            sandbox.stub(record, 'find').returns(Promise.resolve(mockResults));

            await Assert.isRejected(RecordMapper.getRecords());
        });
        it('Should fail (DB error)', async () => {
            sandbox.stub(record, 'find').throws(new Error('DB error'));
            await Assert.isRejected(RecordMapper.getRecords(mockUser), /DB error/);
        });
    });

    describe('deleteRecord', () => {
        it('Should succeed (delete a record)', async () => {
            const currentRecordsNumber = 3;
            const mockResults = generateMockRecords(currentRecordsNumber);
            const deleteStub = sandbox.stub(record, 'findOneAndDelete').returns(Promise.resolve(mockResults));

            const recordIdToDelete = mockResults[0].id;
            const records = await RecordMapper.deleteRecord(recordIdToDelete);

            records.shift();
            Assert.isNotNull(records);
            Assert.equal(deleteStub.callCount, 1);
            Assert.equal(records.length, currentRecordsNumber - 1);
        });
        it('Should fail (no record id)', async () => {
            sandbox.stub(record, 'findOneAndDelete').returns(Promise.reject());

            await Assert.isRejected(RecordMapper.deleteRecord());
        });
        it('Should fail (DB error)', async () => {
            sandbox.stub(record, 'findOneAndDelete').throws(new Error('DB error'));
            await Assert.isRejected(RecordMapper.deleteRecord(mockUser), /DB error/);
        });
    });

    describe('createRecord', () => {
        const mockUrl = 'https://some-url.com';
        const mockThumbnailUrl = 'https://some-url.com';

        const mockResult = {
            mockUrl,
            mockThumbnailUrl,
            mockUser
        };

        it('Should succeed (create a record)', async () => {
            const createStub = sandbox.stub(record, 'create').returns(Promise.resolve(mockResult));

            const createdRecord = await RecordMapper.createRecord(mockUrl, mockThumbnailUrl, mockUser);

            Assert.isNotNull(createdRecord);
            Assert.equal(createStub.args[0][0].url, mockUrl);
            Assert.equal(createStub.args[0][0].thumbnailUrl, mockThumbnailUrl);
            Assert.equal(createStub.args[0][0].user, mockUser.id);
            Assert.equal(createStub.callCount, 1);
        });
        it('Should fail (missing record url)', async () => {
            sandbox.stub(record, 'create').returns(Promise.reject());

            await Assert.isRejected(RecordMapper.createRecord(null, mockThumbnailUrl, mockUser));
        });
        it('Should fail (DB error)', async () => {
            sandbox.stub(record, 'create').throws(new Error('DB error'));
            await Assert.isRejected(RecordMapper.createRecord(mockUrl, mockThumbnailUrl, mockUser), /DB error/);
        });
    });

    describe('addRecordNote', () => {
        const mockRecords = generateMockRecords();
        const recordId = mockRecords[0].id;
        const note = 'some note !@#';

        it('Should fail (missing a note)', async () => {
            sandbox.stub(record, 'findById').returns(Promise.reject());

            await Assert.isRejected(RecordMapper.addRecordNote(recordId, null));
        });
        it('Should fail (DB error)', async () => {
            sandbox.stub(record, 'findById').throws(new Error('DB error'));
            await Assert.isRejected(RecordMapper.addRecordNote(recordId, note), /DB error/);
        });
    });
});
