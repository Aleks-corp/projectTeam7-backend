import Joi from "joi";

import { emailRegexp } from "../constants/regexp.js";

const recipeAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": `'name' should be a type of 'text'`,
    "string.empty": `'name' cannot be an empty field`,
    "any.required": `missing required 'name' field`,
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.pattern.base": `'email' should be a type of 'email'`,
    "string.empty": `'email' cannot be an empty field`,
    "any.required": `missing required 'email' field`,
  }),
  phone: Joi.string().required().messages({
    "string.empty": `'phone' cannot be an empty field`,
    "any.required": `missing required 'phone' field`,
  }),
  favorite: Joi.boolean(),
});

export default { recipeAddSchema };
