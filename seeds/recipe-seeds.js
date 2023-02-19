const { Recipe } = require("../models");

const recipes = [
  {
    title: "Chocolate Chip Cookies",
    ingredients: "Eggs, milk, flour, sugar, chocolate chips",
    difficulty: "Easy",
    instructions:
      "Mix all ingredients together and bake at 350 degrees for 10 minutes",
    user_id: 1,
  },
  {
    title: "Pancakes",
    ingredients: "Eggs, milk, flour, sugar, butter",
    difficulty: "Easy",
    instructions: "Mix all ingredients together and cook on a griddle",
    user_id: 1,
  },
  {
    title: "Spaghetti",
    ingredients: "Spaghetti noodles, tomato sauce, ground beef",
    difficulty: "Easy",
    instructions: "Boil noodles, cook ground beef, mix together",
    user_id: 2,
  },
];

const seedRecipes = () => Recipe.bulkCreate(recipes);

module.exports = seedRecipes;
