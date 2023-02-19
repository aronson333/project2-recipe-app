//These are all the view routes for your application
const router = require("express").Router();
const { Post, User } = require("../models");

// GET /dashboard
router.get("/", async (req, res) => {
  if (!req.session.user_id) {
    res.redirect("/login");
    return;
  }

  try {
    // get all posts for logged in user
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ["id", "title", "contents", "user_id", "created_at"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    // serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    console.log({ totalPosts: postData.length });

    res.render("dashboard", { posts, loggedIn: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET /dashboard/edit/:id
router.get("/edit/:id", async (req, res) => {
  if (!req.session.user_id) {
    res.redirect("/login");
    return;
  }

  try {
    const postData = await Post.findByPk(req.params.id, {
      attributes: ["id", "title", "contents", "user_id", "created_at"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    // serialize the data
    const post = postData.get({ plain: true });

    res.render("edit-post", {
      post,
      loggedIn: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET /dashboard/new
router.get("/new", (req, res) => {
  res.render("add-post", {
    loggedIn: true,
  });
});

module.exports = router;
