const { Post } = require("../models");

const posts = [
  {
    title: "My first post",
    contents: "This is my first post",
    user_id: 1,
  },
  {
    title: "My second post",
    contents: "This is my second post",
    user_id: 1,
  },
  {
    title: "another user's post",
    contents: "This is another user's only post",
    user_id: 2,
  },
];

const seedPosts = () => Post.bulkCreate(posts);

module.exports = seedPosts;
