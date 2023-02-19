const router = require("express").Router();
const { Recipe, User } = require("../../models");

// The `/api/recipes` endpoint

// find all recipes with associated user
router.get("/", async (req, res) => {
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

    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new recipe
router.post("/", async (req, res) => {
  if (!req.session.user_id) {
    res.redirect("/login");
  }
  try {
    const recipe = await Recipe.create({
      title: req.body.title,
      ingredients: req.body.ingredients,
      difficulty: req.body.difficulty,
      instructions: req.body.instructions,
      user_id: req.session.user_id,
    });

    res.status(200).json(recipe);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// delete a recipe by its `id` value
router.delete("/:id", async (req, res) => {
  if (!req.session.user_id) {
    res.redirect("/login");
  }

  try {
    // get the recipe by its id
    const recipe = await Recipe.findByPk(req.params.id);

    if (!recipe) {
      res.status(404).json({ message: "No recipe found with this id!" });
      return;
    }

    // if the user attempting to delete the recipe is not the owner, return an error
    if (recipe.user_id !== req.session.user_id) {
      res
        .status(403)
        .json({ message: "You are not authorized to delete this recipe!" });
      return;
    }

    const deletedRecipe = await Recipe.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deletedRecipe) {
      res.status(404).json({ message: "No recipe found with this id!" });
      return;
    }

    res.status(200).json(deletedRecipe);
  } catch (err) {
    console.error(error);
    res.status(500).json(err);
  }
});

module.exports = router;
