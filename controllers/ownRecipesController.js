import { ApiError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";
import Recipe from "../models/recipe.js";

const getOwnRecipes = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 0, ...query } = req.query;
  const skip = (page - 1) * limit;
  const recipes = await Recipe.find(
    { owner, ...query },
    "-owner -createdAt -updatedAt",
    { skip, limit }
  );
  const totalHits = await Recipe.count({ owner, ...query });
  res.json({ totalHits, recipes });
};

const addOwnRecipe = async (req, res) => {
  res.status(201).json({ message: "Add to Own" });
};

const removeOwnRecipe = async (req, res) => {
  res.json({ message: "Recipe deleted from own" });
};

export default {
  getOwnRecipes: ctrlWrapper(getOwnRecipes),
  addOwnRecipe: ctrlWrapper(addOwnRecipe),
  removeOwnRecipe: ctrlWrapper(removeOwnRecipe),
};
