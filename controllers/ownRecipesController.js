import { ApiError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";
import Recipe from "../models/recipe.js";
import Ingredient from "../models/ingredient.js";
import path from "path";
import fs from "fs/promises";
import Jimp from "jimp";

const photoOwnRecipePath = path.resolve("public", "recipes");

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
  const {_id: owner} = req.user;
  const { path: tempPath, filename } = req.file;

  try {
    const image = await Jimp.read(tempPath);
    await image.resize(250, 250).write(tempPath);
  }catch {
    httpError(400, 'File cannot be upload')
  };

  const newPath = path.join(photoOwnRecipePath, filename);
  await fs.rename(tempPath, newPath);
  const photo = path.join("recipes", filename);

  const ingredients = await Ingredient.find(
    { _id: { $in: req.body.ingredients } });

  const result = await Recipe.create({...req.body, owner, ingredients,  drinkThumb: photo
  })
  res.status(201).json(result)
};



const removeOwnRecipe = async (req, res) => {

  const {_id: owner} = req.user;
  const result = await Recipe.findOneAndRemove({owner, _id:req.params.id})
  if (!result) {
    throw httpError(404);
  }
  res.json({ message: "Recipe deleted from own" });
};

export default {
  getOwnRecipes: ctrlWrapper(getOwnRecipes),
  addOwnRecipe: ctrlWrapper(addOwnRecipe),
  removeOwnRecipe: ctrlWrapper(removeOwnRecipe),
};
