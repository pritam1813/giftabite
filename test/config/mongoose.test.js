const expect = require('chai').expect;
const db = require('../../config/mongoose');
const helper = require('../test_helper');

const { mongoose, connectToDatabase } = require('../../config/mongoose');
//Using mocha
describe('Database connection', function() {
  it('should connect to the database without errors', async function() {
    try {
      await db;
      expect(mongoose.connection.readyState).to.equal(1);
    } catch (error) {
      expect.fail(error);
    }
  });
});


//Using Jest

// describe('MongoDB Connection', () => {
//     beforeAll(async () => {
//         await connectToDatabase();
//     });

//     afterAll(async () => {
//         await mongoose.connection.close();
//     });

//     it('should connect to the MongoDB database', () => {
//         expect(mongoose.connection.readyState).to.equal(2);
//     });

//     it('should not throw any error when connecting to the database', () => {
//         expect(connectToDatabase).not.to.throw();
//     });
// });