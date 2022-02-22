const request = require('supertest');
const app = require('../app.js');
const { StatusCodes: HttpStatus } = require('http-status-codes');

const User = require('../api/models/user.js');

require('dotenv').config();

describe('API DroneGuard Debriefing System 🚁', () => {
    /* Keep token up to date by copy & paste it in .env file! */
    const fakeBearerToken = process.env.USER_TOKEN;
    const fakeUser = {
        email: process.env.USER_EMAIL,
        password: process.env.USER_PW
    };
    const fakeCurrentAdminUser = {
        id: process.env.USER_ID,
        name: process.env.USER_NAME,
        email: process.env.USER_EMAIL,
        userType: 'Admin',
    };
    const testNote = {
        text: `foo bar at ${Date.now()} !@#$%^&*()`
    };
    let testRecordId = null;

    describe('POST /api/user/login', () => {
        it('Should succeed (return a JSON containing logged-in user details)', async () => {
            return await request(app).post('/api/user/login')
                .send(fakeUser)
                .expect('Content-Type', /json/)
                .expect(HttpStatus.OK)
                .then((res) => {
                    expect(res.body).toEqual(
                        expect.objectContaining({
                            _id: expect.any(String),
                            name: expect.any(String),
                            email: expect.any(String),
                            token: expect.any(String)
                        }))
                })
        });
    });

    describe('POST /api/user/register', () => {
        const userData = {
            name: 'some name',
            password: 'some_password',
            email: 'email@email.com',
            userType: 'Lifeguard'
        };
        let userIdToDelete = null;

        it('Should succeed (return a JSON containing the new user details)', async () => {
            return await request(app).post('/api/user/register')
                .send(userData)
                .expect('Content-Type', /json/)
                .expect(HttpStatus.CREATED)
                .then((res) => {
                    expect(res.body).toEqual(
                        expect.objectContaining({
                            id: expect.any(String),
                            email: expect.any(String),
                            name: expect.any(String),
                            userType: expect.any(String),
                            token: expect.any(String)
                        }))

                    /* save for later delete */
                    userIdToDelete = res.body.id;
                })
        });
        it('Should fail (user already exists)', async () => {
            return await request(app).post('/api/user/register')
                .send(userData)
                .expect('Content-Type', /json/)
                .expect(HttpStatus.BAD_REQUEST)
                .then((userIdToDelete) => {
                    User.findOneAndDelete({ _id: userIdToDelete });
                });
        });
    });

    describe('GET /api/user', () => {
        it('Should fail (user is unauthorized)', async () => {
            return await request(app).get('/api/user')
                .send(fakeCurrentAdminUser)
                .expect('Content-Type', /json/)
                .expect(HttpStatus.UNAUTHORIZED)
                .then((res) => {
                    expect(res.body).toEqual(
                        expect.objectContaining({
                            message: 'Missing bearer token',
                        }))
                })
        });
    });

    describe('GET /api/user', () => {
        it('Should succeed (return current user details)', async () => {
            return await request(app).get('/api/user')
                .auth(fakeBearerToken, { type: 'bearer' })
                .expect('Content-Type', /json/)
                .expect(HttpStatus.OK)
                .then((res) => expect(res.body).toEqual(fakeCurrentAdminUser));
        });
    });

    describe('GET /api/beach', () => {
        it('Should succeed (return array of beaches)', async () => {
            return await request(app).get('/api/beach')
                .auth(fakeBearerToken, { type: 'bearer' })
                .expect('Content-Type', /json/)
                .expect(HttpStatus.OK)
                .then((res) => expect(typeof (res.body) === Array))
        });
    });

    describe('GET /api/record', () => {
        it('Should succeed (return array of records)', async () => {
            return await request(app).get('/api/record')
                .auth(fakeBearerToken, { type: 'bearer' })
                .expect('Content-Type', /json/)
                .expect(HttpStatus.OK)
                .then((res) => expect(typeof (res.body) === Array))
        });
    });

    describe(`POST /api/record`, () => {
        const testRecord = {
            url: 'https://foo.bar.com',
            thumbnailUrl: 'https://some-thumbnail.com'
        }
        it('Should succeed (create new record)', async () => {
            return await request(app).post('/api/record/')
                .auth(fakeBearerToken, { type: 'bearer' })
                .send(testRecord)
                .expect(HttpStatus.CREATED)
                .then((res) => {
                    testRecordId = res.body._id;
                })
        });
    });

    describe('POST /api/record/<some-record-id>/note', () => {
        it('Should fail (no record id)', async () => {
            return await request(app).post('/api/record/<some-record-id>/note')
                .auth(fakeBearerToken, { type: 'bearer' })
                .send({ testNote })
                .expect(HttpStatus.BAD_REQUEST)
        });
        it('Should succeed (add note to a specific record)', async () => {
            /* change record id to real one [created with `POST /api/record` test] */
            return await request(app).post(`/api/record/${testRecordId}/note`)
                .auth(fakeBearerToken, { type: 'bearer' })
                .send({ testNote })
                .expect(HttpStatus.CREATED)
                .then((res) => expect(typeof (res.body) === {}))
        });
    });

    describe('DELETE /api/record', () => {
        it('Should succeed (delete specific record)', async () => {
            return await request(app).delete(`/api/record/${testRecordId}`)
                .auth(fakeBearerToken, { type: 'bearer' })
                .expect(HttpStatus.OK)
        });
        it('Should fail (specific record was not found)', async () => {
            return await request(app).delete('/api/record')
                .auth(fakeBearerToken, { type: 'bearer' })
                .expect(HttpStatus.NOT_FOUND)
        });
    });
});