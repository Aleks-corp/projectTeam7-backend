import Joi from "joi";
import { categoryList, glassList } from "../constants/constants.js";

const recipeAddSchema = Joi.object({
  drink: Joi.string().required().messages({
    "string.base": `'title' should be a type of 'text'`,
    "string.empty": `'title' cannot be an empty field`,
    "any.required": `missing required 'title' field`,
  }),
  drinkAlternate: Joi.string().required().messages({
    "string.base": `'description' should be a type of 'text'`,
    "string.empty": `'description' cannot be an empty field`,
    "any.required": `missing required 'description' field`,
  }),
  category: Joi.array()
    .items(Joi.string().valid(...categoryList))
    .unique()
    .required()
    .messages({
      "array.empty": `'category' cannot be an empty array`,
      "any.required": `missing required 'category' field`,
    }),
  glass: Joi.array()
    .items(Joi.string().valid(...glassList))
    .unique()
    .required()
    .messages({
      "array.empty": `'glass' cannot be an empty array`,
      "any.required": `missing required 'glass' field`,
    }),
  instructions: Joi.string().required().messages({
    "string.empty": `'instructions' cannot be an empty field`,
    "any.required": `missing required 'instructions' field`,
  }),
  drinkThumb: Joi.string().required().messages({
    "string.empty": `'drinkThumb' cannot be an empty field`,
    "any.required": `missing required 'drinkThumb' field`,
  }),
  ingredients: Joi.array().items(Joi.string()).unique().required().messages({
    "array.empty": `'ingredients' cannot be an empty array`,
    "any.required": `missing required 'ingredients'`,
  }),
});

export default { recipeAddSchema };
