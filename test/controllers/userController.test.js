const chai = require('chai');
const chaiHttp = require('chai-http');
const bcrypt = require('bcrypt');
const app = require('../../index');
const User = require('../../models/user');
const helper = require('../test_helper');
chai.use(chaiHttp);
const expect = chai.expect;

describe('User Controller', async () => {

    before(async function () {
        await helper.connectDB();
    });
    beforeEach(async function () {
        await helper.clearTestData();
    });
    after(async function () {
        await helper.connectDB();
    });

    afterEach(async function () {
        await helper.clearTestData();
    });

    describe('Signup', function () {

        it('should create a new user with valid email and matching passwords', async function () {

            const res = await chai
                .request(app)
                .post('/join-us/signup')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send({
                    name: 'Test User',
                    email: 'giftabite23@gmail.com',
                    password: 'P@ssw0rd',
                    confirm_password: 'P@ssw0rd',
                    phoneNumber: '7129804712'
                });

            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal({ success: 'Signed Up successfully please login', type: 'SignupSuccess' });

            const user = await User.findOne({ email: 'giftabite23@gmail.com' });
            expect(user).to.exist;
            expect(user.email).to.equal('giftabite23@gmail.com');
            const passwordMatch = await bcrypt.compare('P@ssw0rd', user.password);
            expect(passwordMatch).to.be.true;
        }).timeout(5000);

        it('should return an error if the email is invalid', async function () {

            const res = await chai
                .request(app)
                .post('/join-us/signup')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send({
                    name: 'Test User',
                    email: 'giftabite23gmailcom',
                    password: 'P@ssw0rd',
                    confirm_password: 'P@ssw0rd',
                    phoneNumber: '7129204712'
                });

            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal({ error: 'Email error: regex', type: 'InvalidEmail' });

            const user = await User.findOne({ email: 'giftabite23gmail.com' });
            expect(user).to.not.exist;
        }).timeout(5000);

        it('should return an error if the passwords do not match', async function () {

            const res = await chai
                .request(app)
                .post('/join-us/signup')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send({
                    name: 'Test User',
                    email: 'giftabite23@gmail.com',
                    password: 'P@ssw0rd1',
                    confirm_password: 'P@ssw0rd2',
                    phoneNumber: '7129204712'
                });

            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal({ error: 'Passwords do not match', type: 'PasswordMismatch' });

            const user = await User.findOne({ email: 'giftabite23gmail.com' });
            expect(user).to.not.exist;
        }).timeout(5000);

        it('should return an error if the user already exists', async function () {


            await User.create({
                name: 'Test User',
                email: 'giftabite23@gmail.com',
                password: 'P@ssw0rd',
                confirm_password: 'P@ssw0rd',
                phoneNumber: '7129204712'
            });

            const res = await chai
                .request(app)
                .post('/join-us/signup')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send({
                    name: 'Test User',
                    email: 'giftabite23@gmail.com',
                    password: 'P@ssw0rd',
                    confirm_password: 'P@ssw0rd',
                    phoneNumber: '7129204712'
                });

            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal({ error: 'User already exists', type: 'UserExist' });
        }).timeout(5000);
    });
});