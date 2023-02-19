const { Comment } = require("../models");

const comments = [
  {
    contents: "first comment",
    user_id: 3,
    post_id: 1,
  },
  {
    contents: "second comment",
    user_id: 2,
    post_id: 1,
  },
  {
    contents: "third comment",
    user_id: 1,
    post_id: 1,
  },
  {
    contents: "fourth comment",
    user_id: 4,
    post_id: 1,
  },
];

const seedComments = () => Comment.bulkCreate(comments);

module.exports = seedComments;
