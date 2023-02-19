const router = require("express").Router();
const { Comment } = require("../../models");

// The `/api/comments` endpoint

// find all comments
router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      attributes: ["id", "contents", "post_id", "user_id", "created_at"],
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new comment
router.post("/", async (req, res) => {
  try {
    if (!req.session.loggedIn) {
      res.status(400).json({ message: "You must be logged in to comment." });
      return;
    }

    req.body.user_id = req.session.user_id;
    const commentData = await Comment.create(req.body);
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
