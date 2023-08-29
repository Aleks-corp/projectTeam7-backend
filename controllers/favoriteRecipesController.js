import { ApiError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";
import Recipe from "../models/recipe.js";

const getFavoriteRecipes = async (req, res) => {
  const { _id: userId } = req.user;
  const { page = 1, limit = 0, ...query } = req.query;
  const skip = (page - 1) * limit;
  const recipes = await Recipe.find(
    { favorites: userId, ...query },
    "-createdAt -updatedAt",
    { skip, limit }
  );
  const totalHits = await Recipe.count({ favorites: userId, ...query });
  res.json({ totalHits, recipes });
};

const addFavoriteRecipe = async (req, res) => {
  const { id } = req.body;
  const { _id: userId } = req.user;
  const recipe = await Recipe.findById(id);
  if (!recipe) {
    throw ApiError(404);
  }
  if (recipe.favorites.some(el => el._id.toString() === userId.toString())) {
    throw ApiError(400, "This recipe is already in favorites");
  } else {
    await Recipe.findByIdAndUpdate(
      id,
      { $push: { favorites: userId } },
      { new: true }
    );
    res.status(201).json({ id, message: "Recipe added to favorites" });
  }
};

const removeFavoriteRecipe = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const recipe = await Recipe.findById(id);
  if (!recipe) {
    throw ApiError(404);
  }
  if (recipe.favorites.some(el => el._id.toString() === userId.toString())) {
    await Recipe.findByIdAndUpdate(
      id,
      { $pull: { favorites: userId } },
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
