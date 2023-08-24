import Joi from "joi";

import { emailRegexp } from "../constants/regexp.js";

const userAddSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.empty": `'name' cannot be an empty field`,
    "any.required": `missing required 'name' field`,
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.pattern.base": `'email' should be a type of 'email'`,
    "string.empty": `'email' cannot be an empty field`,
    "any.required": `missing required 'email' field`,
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": `'password' cannot be an empty field`,
    "any.required": `missing required 'password' field`,
  }),
});

const userLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.pattern.base": `'email' should be a type of 'email'`,
    "string.empty": `'email' cannot be an empty field`,
    "any.required": `missing required 'email' field`,
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": `'password' cannot be an empty field`,
    "any.required": `missing required 'password' field`,
  }),
});

export default { userAddSchema, userLoginSchema };
