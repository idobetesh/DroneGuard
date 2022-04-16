const Sinon = require('sinon');
const Assert = require('chai').use(require('chai-as-promised')).assert;
const Uuid = require('uuid').v4;

const user = require('../../../../api/models/user.js');
const UserMapper = require('../../../../api/mappers/user-mapper.js');

const sandbox = Sinon.createSandbox();

describe('user-mapper 👲', () => {
    const mockUser = {
        id: Uuid(),
        name: 'some-name',
        email: 'some-email@dg.com',
        userType: 'Admin'
    };

    afterEach(() => {
        sandbox.restore();
    });

    describe('getUserByEmail', () => {
        const mockEmail = mockUser.email;

        it('Should succeed (return a user by email)', async () => {
            const findStub = sandbox.stub(user, 'findOne').returns(Promise.resolve(mockUser));

            const userByEmail = await UserMapper.getUserByEmail(mockEmail);

            Assert.isNotNull(userByEmail);
            Assert.equal(findStub.callCount, 1);
            Assert.equal(userByEmail, mockUser);
        });
        it('Should fail (user was not found)', async () => {
            sandbox.stub(user, 'findOne').returns(Promise.reject());

            await Assert.isRejected(UserMapper.getUserByEmail('no-mail'));
        });
        it('Should fail (DB error)', async () => {
            sandbox.stub(user, 'findOne').throws(new Error('DB error'));
            await Assert.isRejected(UserMapper.getUserByEmail(mockEmail), /DB error/);
        });
    });

    describe('createUser', () => {
        const mockEmail = 'some-email@dg.com';
        const mockPassword = 'hard-password'; 
        const mockName = 'some-name';
        const mockUserType = 'Admin';

        it('Should succeed (create a user)', async () => {
            const createStub = sandbox.stub(user, 'create').returns(Promise.resolve(mockUser));

            const createdUser = await UserMapper.createUser(mockEmail, mockPassword, mockName, mockUserType);

            Assert.equal(createStub.callCount, 1);
            Assert.isNotNull(createdUser);
            Assert.equal(createStub.args[0][0].email, mockEmail);
            Assert.equal(createStub.args[0][0].password, mockPassword);
            Assert.equal(createStub.args[0][0].name, mockName);
            Assert.equal(createStub.args[0][0].userType, mockUserType);
        });
        it('Should fail (missing user name)', async () => {
            sandbox.stub(user, 'create').returns(Promise.reject());

            await Assert.isRejected(UserMapper.createUser(mockEmail, mockPassword, undefined, mockUserType));
        });
        it('Should fail (DB error)', async () => {
            sandbox.stub(user, 'create').throws(new Error('DB error'));
            await Assert.isRejected(UserMapper.createUser(), /DB error/);
        });
    });
});
