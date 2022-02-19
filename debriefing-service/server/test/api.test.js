const request = require('supertest');
const app = require('../app');
const { StatusCodes: HttpStatus } = require('http-status-codes');

require('dotenv').config();

describe('API DroneGuard Debriefing System 🚁', () => {
    /* Keep token up to date by copy & past it in .env file! */
    const fakeBearerToken = process.env.USER_TOKEN;
    const fakeUser = {
        email: process.env.USER_EMAIL,
        password: process.env.USER_PW
    };
    const fakeCurrentAdminUser = {
        id: process.env.USER_ID,
        name: process.env.USER_NAME,
        email: process.env.USER_EMAIL,
        userType: "Admin",
    };
    const newComment = `foo bar at ${Date.now()} !@#$%^&*()`;

    describe('POST /api/user/login', () => {
        it('Should success (return a JSON containing logged-in user details)', async () => {
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

    describe('GET /api/user', () => {
        it('Should fail (user is unauthorized)', async () => {
            return await request(app).get('/api/user')
                .send(fakeCurrentAdminUser)
                .expect('Content-Type', /json/)
                .expect(HttpStatus.UNAUTHORIZED)
                .then((res) => {
                    expect(res.body).toEqual(
                        expect.objectContaining({
                            message: "Missing bearer token",
                        }))
                })
        });
    });

    describe('GET /api/user', () => {
        it('Should success (return current user details)', async () => {
            return await request(app).get('/api/user')
                .auth(fakeBearerToken, { type: 'bearer' })
                .expect('Content-Type', /json/)
                .expect(HttpStatus.OK)
                .then((res) => expect(res.body).toEqual(fakeCurrentAdminUser));
        });
    });

    describe('GET /api/beach', () => {
        it('Should success (return array of beaches)', async () => {
            return await request(app).get('/api/beach')
                .auth(fakeBearerToken, { type: 'bearer' })
                .expect('Content-Type', /json/)
                .expect(HttpStatus.OK)
                .then((res) => expect(typeof (res.body) === Array))
        });
    });

    describe('GET /api/record', () => {
        it('Should success (return array of records)', async () => {
            return await request(app).get('/api/record')
                .auth(fakeBearerToken, { type: 'bearer' })
                .expect('Content-Type', /json/)
                .expect(HttpStatus.OK)
                .then((res) => expect(typeof (res.body) === Array))
        });
    });

    describe('POST /api/record/comment', () => {
        it('Should fail (no record id)', async () => {
            return await request(app).post('/api/record/comment')
                .auth(fakeBearerToken, { type: 'bearer' })
                .send({ id: null, comment: newComment })
                .expect(HttpStatus.BAD_REQUEST)
        });

        /* change record id to real one */
        const id = process.env.RECORD_ID;

        it('Should success (add new comment to a specific record)', async () => {
            return await request(app).post('/api/record/comment')
                .auth(fakeBearerToken, { type: 'bearer' })
                .send({ id, comment: newComment })
                .expect('Content-Type', /json/)
                .expect(HttpStatus.OK)
                .then((res) => expect(typeof (res.body) === {}))
        });
    });
    
    describe(`DELETE /api/record`, () => {
        it('Should success (delete specific record)', async () => {
            return await request(app).delete(`/api/record/${process.env.RECORD_ID}`)
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