const { User } = require("../models");

const users = [
  {
    username: "user1",
    password: "password123",
  },
  {
    username: "user2",
    password: "password123",
  },
  {
    username: "user3",
    password: "password123",
  },
  {
    username: "user4",
    password: "password123",
  },
];

const seedUsers = () => User.bulkCreate(users, { individualHooks: true });

module.exports = seedUsers;
