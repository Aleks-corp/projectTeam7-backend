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
  res.json({ message: "MainPage" });
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
};
