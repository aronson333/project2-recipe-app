//These are all the view routes for your application
const router = require("express").Router();
const { Recipe, User } = require("../models");

// GET /dashboard
router.get("/", async (req, res) => {
  if (!req.session.user_id) {
    res.redirect("/login");
    return;
  }

  try {
    // get all recipes for logged in user
    const recipes = await Recipe.findAll({
      where: {
        user_id: req.session.user_id,
      },
      // attributes: ["id", "title", "contents", "user_id", "created_at"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    // serialize data so the template can read it
    const formattedRecipes = recipes.map((recipe) =>
      recipe.get({ plain: true })
    );

    res.render("dashboard", { recipes: formattedRecipes, loggedIn: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET /dashboard/new
router.get("/new", (req, res) => {
  const difficulties = [
    { value: "Easy", text: "Easy" },
    { value: "Medium", text: "Medium" },
    { value: "Hard", text: "Hard" },
  ];
  res.render("add-recipe", {
    loggedIn: true,
    difficulties,
  });
});

module.exports = router;
