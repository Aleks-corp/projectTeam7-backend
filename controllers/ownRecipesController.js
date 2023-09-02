import { ApiError, cloudinary } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";
import Recipe from "../models/recipe.js";
import Ingredient from "../models/ingredient.js";
import fs from "fs/promises";

const getOwnRecipes = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 0, ...query } = req.query;
  const skip = (page - 1) * limit;
  const recipes = await Recipe.find(
    { owner, ...query },
    "drink drinkAlternate drinkThumb ingredients",
    { skip, limit }
  );
  const totalHits = await Recipe.count({ owner, ...query });
  res.json({ totalHits, recipes });
};

const addOwnRecipe = async (req, res) => {
  const { _id: owner } = req.user;

  let drinkThumb = '';
  if (req.file){
  const { path: tempPath } = req.file;

  const { url } = await cloudinary.uploader.upload(tempPath, {
    folder: "recipes",
    width: 400,
    height: 400,
    crop: "fill",
  });

  drinkThumb = url;
  await fs.unlink(tempPath);
}

  const requestedIngredients = req.body.ingredients.map(({title}) => title); 

  const storagedIngredients = await Ingredient.find({
    title: { $in: requestedIngredients },
  });

  const ingredients = req.body.ingredients.map(ingredient => {
    const stIng = storagedIngredients.find(
      element => element.title === ingredient.title
    );

    const recipeIngr = {
      title: ingredient.title,
      measure: ingredient.measure,
      ingredientThumb: stIng.ingredientThumb,
    };

    return recipeIngr;
  });

  const result = await Recipe.create({
    ...req.body,
    owner,
    ingredients,
    drinkThumb,
  });
  res.status(201).json(result);
};

const removeOwnRecipe = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Recipe.findOneAndRemove({ owner, _id: req.params.id });

  if (!result) {
    throw ApiError(404);
  }
  res.json({ id: result._id, message: "Recipe is deleted" });
};

export default {
  getOwnRecipes: ctrlWrapper(getOwnRecipes),
  addOwnRecipe: ctrlWrapper(addOwnRecipe),
  removeOwnRecipe: ctrlWrapper(removeOwnRecipe),
};
