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
  const {_id: owner} = req.user;
  const { path: tempPath } = req.file;

  const {url:drinkThumb} = await cloudinary.uploader
  .upload(tempPath, 
    {folder: "recipes", 
    width: 400,
    height: 400,
    crop: "fill"
 });

  await fs.unlink(tempPath);

  const requestedIngredients = req.body.ingredients;

  const storagedIngredients = await Ingredient.find(
    { _id: { $in: requestedIngredients } });

    const ingredients = requestedIngredients.map(ingredient => {

      const stIng = storagedIngredients.find(element => element._id == ingredient.id);
      if (!stIng){
        ApiError(400, `Ingredient with id ${ingredient.id} is absent`)
      } 
      const newIngr =  {
        title: stIng.title,
        measure:ingredient.measure,
        ingredientThumb:stIng.ingredientThumb
      }
    return newIngr
    })

  const result = await Recipe.create({
    ...req.body, 
    owner, 
    ingredients,  
    drinkThumb
  })
  res.status(201).json(result)
};



const removeOwnRecipe = async (req, res) => {

  const {_id: owner} = req.user;

  const result = await Recipe.findOneAndRemove({owner, _id:req.params.id})

  if (!result) {
    throw ApiError(404);
  }
  res.json({ id:result._id, message: "Recipe is deleted" });
};

export default {
  getOwnRecipes: ctrlWrapper(getOwnRecipes),
  addOwnRecipe: ctrlWrapper(addOwnRecipe),
  removeOwnRecipe: ctrlWrapper(removeOwnRecipe),
};
