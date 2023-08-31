import { ApiError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";
import Recipe from "../models/recipe.js";
import Ingredient from "../models/ingredient.js";
import { categoryList, glassList } from "../constants/constants.js";

const getCategoryList = async (req, res) => {
  res.json(categoryList);
};

const getGlassList = async (req, res) => {
  res.json(glassList);
};
const getIngredientsList = async (req, res) => {
  const ingredientObjList = await Ingredient.find();
  const ingredientList = [];
  ingredientObjList.forEach(element => {
    ingredientList.push(element.title);
  });
  res.json(ingredientList);
};

const getRecipesForMain = async (req, res) => {
  const { limit = 3 } = req.query;
  const recipes = await Recipe.aggregate([
    {
      $addFields: {
        favoritesCount: { $size: { $ifNull: ["$favorites", []] } },
      },
    },
    { $sort: { favoritesCount: -1 } },
    { $project: { favoritesCount: 0 } },
    {
      $group: {
        _id: "$category",
        recipeCount: { $sum: 1 },
        recipes: { $push: "$$ROOT" },
      },
    },
    { $sort: { recipeCount: -1 } },
    { $limit: 4 },
    {
      $project: {
        recipes: {
          $slice: [
            "$recipes",
            typeof limit === "number" ? limit : Number(limit),
          ],
        },
      },
    },
  ]);

  res.json(recipes);
};

const getPopularRecipes = async (req, res) => {
  const recipes = await Recipe.aggregate([
    {
      $addFields: {
        favoritesCount: { $size: { $ifNull: ["$favorites", []] } },
      },
    },
    { $sort: { favoritesCount: -1 } },
    { $project: { favoritesCount: 0 } },
    { $limit: 4 },
  ]);

  res.json(recipes);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const recipe = await Recipe.findById(id);
  if (!recipe) {
    throw ApiError(404);
  }
  res.json(recipe);
};

export default {
  getCategoryList: ctrlWrapper(getCategoryList),
  getGlassList: ctrlWrapper(getGlassList),
  getIngredientsList: ctrlWrapper(getIngredientsList),

  getRecipesForMain: ctrlWrapper(getRecipesForMain),
  getRecipeById: ctrlWrapper(getRecipeById),
  getPopularRecipes: ctrlWrapper(getPopularRecipes),
};
