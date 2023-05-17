const passport = require('../../config/passport-local');
const User = require('../../models/user');
const bcrypt = require('bcrypt');
const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');
const helper = require('../test_helper');

// Import your models and passport-local.js here

describe('Authentication', () => {

  // Connect to the test database before running the tests
  before(async () => {
    await mongoose.createConnection('mongodb://127.0.0.1:27017/testDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  });
  });

  // Delete all records from the database before each test
  beforeEach(async () => {
    await helper.clearTestData();
  });

  // Run your tests here
  describe('Local Strategy', () => {

    it('should authenticate the user with correct credentials', async () => {
      // Create a new user with a hashed password
      const password = 'Test@1234';
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        name: 'IGNOU BCSP-064',
        email: 'test1@example.com',
        password: hashedPassword,
        phoneNumber: '0961287992'
      });

      // Authenticate with the user's email and password
      const done = (err, user) => {
        expect(err).to.be.null;
        expect(user).to.exist;
      };
      await passport.authenticate('local', {
        body: {
          email: user.email,
          password: password
        }
      }, done);
    });

    it('should not authenticate the user with incorrect email', async () => {
      // Authenticate with a non-existent email
      const done = (err, user) => {
        expect(err).to.be.null;
        expect(user).to.be.false;
      };
      await passport.authenticate('local', {
        body: {
          email: 'invalid@example.com',
          password: 'Test@1234'
        }
      }, done);
    });

    it('should not authenticate the user with incorrect password', async () => {
      // Create a new user with a hashed password
      const password = 'Test@1234';
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        name: 'IGNOU BCSP-064',
        email: 'test2@example.com',
        password: hashedPassword,
        phoneNumber: '1961287391'
      });

      // Authenticate with the user's email and an incorrect password
      const done = (err, user) => {
        expect(err).to.be.null;
        expect(user).to.be.false;
      };
      await passport.authenticate('local', {
        body: {
          email: user.email,
          password: 'wrongpassword'
        }
      }, done);
    });

  });

  // Disconnect from the test database after running the tests
  after(async () => {
    await helper.closeDB();
  });
});



