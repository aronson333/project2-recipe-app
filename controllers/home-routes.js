const router = require("express").Router();
const { User, Recipe } = require("../models");

// GET /
router.get("/", async (req, res) => {
  // get all recipes and display them on the homepage
  try {
    const recipes = await Recipe.findAll({
      // attributes: ["id", "title", "contents", "user_id", "created_at"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const formattedRecipes = recipes.map((recipe) =>
      recipe.get({ plain: true })
    );

    res.render("home", {
      recipes: formattedRecipes,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET /recipe/:id
router.get("/recipe/:id", async (req, res) => {
  // get a single recipe and display it on the recipe page
  try {
    const recipe = await Recipe.findByPk(req.params.id, {
      // attributes: ["id", "title", "contents", "user_id", "created_at"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    if (!recipe) {
      res.status(404).json({ message: "No recipe found with this id!" });
      return;
    }

    const formattedRecipe = recipe.get({ plain: true });

    res.render("recipe", {
      recipe: formattedRecipe,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

module.exports = router;
