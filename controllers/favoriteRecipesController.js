import { ApiError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";
import Recipe from "../models/recipe.js";

const getFavoriteRecipes = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 0, ...query } = req.query;
  const skip = (page - 1) * limit;
  const recipes = await Recipe.find(
    { favorites: _id, ...query },
    "-owner -createdAt -updatedAt",
    { skip, limit }
  );
  const totalHits = await Recipe.count({ favorites: _id, ...query });
  res.json({ totalHits, recipes });
};

const addFavoriteRecipe = async (req, res) => {
  // отримали ID рецепту і додали ID user до масиву favorites
  res.status(201).json({ message: "added to favorite" });
};

const removeFavoriteRecipe = async (req, res) => {
  // отримали ID рецепту і видалили ID user до масиву favorites
  res.json({ message: "Recipe deleted" });
};

export default {
  getFavoriteRecipes: ctrlWrapper(getFavoriteRecipes),
  addFavoriteRecipe: ctrlWrapper(addFavoriteRecipe),
  removeFavoriteRecipe: ctrlWrapper(removeFavoriteRecipe),
};
