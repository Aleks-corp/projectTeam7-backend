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
  const { id } = req.body;
  const { _id } = req.user;

  const recipe = await Recipe.findById(id);
  if (!recipe) {
    throw ApiError(404);
  }
  if (recipe.favorites.includes(_id)) {
    throw ApiError(400, "This recipe is already in favorites");
  } else {
    await Recipe.findByIdAndUpdate(
      id,
      { $push: { favorites: _id } },
      { new: true }
    );
    res.status(201).json({ id, message: "Recipe added to favorites" });
  }
};

const removeFavoriteRecipe = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const recipe = await Recipe.findById(id);
  if (!recipe) {
    throw ApiError(404);
  }
  if (recipe.favorites.includes(_id)) {
    await Recipe.findByIdAndUpdate(
      id,
      { $pull: { favorites: _id } },
      { new: true }
    );
    res.json({ id, message: "Recipe deleted from favorites" });
  } else {
    throw ApiError(400, "This recipe hasn't been added to favorites");
  }
};

export default {
  getFavoriteRecipes: ctrlWrapper(getFavoriteRecipes),
  addFavoriteRecipe: ctrlWrapper(addFavoriteRecipe),
  removeFavoriteRecipe: ctrlWrapper(removeFavoriteRecipe),
};
