const router = require("express").Router();
const { Post, User, Comment } = require("../../models");

// The `/api/posts` endpoint

// find all posts with associated user and comments
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: ["id", "title", "contents", "user_id", "created_at"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["id", "contents", "post_id", "user_id"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new post
router.post("/", async (req, res) => {
  if (!req.session.user_id) {
    res.redirect("/login");
  }
  try {
    const postData = await Post.create({
      title: req.body.title,
      contents: req.body.contents,
      user_id: req.session.user_id,
    });

    console.log("created post: ", postData);

    res.status(200).json(postData);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// update a post's title by its `id` value
router.put("/:id", async (req, res) => {
  if (!req.session.user_id) {
    res.redirect("/login");
  }
  try {
    const postData = await Post.update(
      {
        title: req.body.title,
        contents: req.body.contents,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a post by its `id` value
router.delete("/:id", async (req, res) => {
  if (!req.session.user_id) {
    res.redirect("/login");
  }
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    console.error(error);
    res.status(500).json(err);
  }
});

module.exports = router;
