const mongoose = require('mongoose');
const User = require('../models/user');
const Request = require('../models/request');
const url = 'mongodb://127.0.0.1:27017/testDB';

async function connectDB() {
  await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  });
}

async function seedTestData() {
  // Create some sample users
  const users = [
    {
      name: 'User 1',
      email: 'test1@example.com',
      password: 'p@ssWord1',
      confirm_password: 'p@ssWord1',
      phoneNumber: '1234567823'
    },
    {
      name: 'User 2',
      email: 'test2@example.com',
      password: 'p@ssWord2',
      confirm_password: 'p@ssWord2',
      phoneNumber: '1234567813'
    },
  ];

  await User.insertMany(users);

  // Create some sample requests
  const requests = [
    {
      requestedBy: users[0]._id,
      quantity: 10,
    },
    {
      requestedBy: users[1]._id,
      quantity: 20,
    },
  ];

  await Request.insertMany(requests);
}

async function clearTestData() {
  await User.deleteMany({});
  await Request.deleteMany({});
}

async function closeDB() {
  await mongoose.connection.close();
}

module.exports = {
  connectDB,
  seedTestData,
  clearTestData,
  closeDB,
};