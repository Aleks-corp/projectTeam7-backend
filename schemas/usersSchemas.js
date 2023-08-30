import Joi from "joi";

import { emailRegexp, passwordRegexp } from "../constants/regexp.js";

const userAddSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.empty": `'name' cannot be an empty field`,
    "string.min": `Name is too short, min 3`,
    "any.required": `missing required 'name' field`,
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.pattern.base": `'email' should be a type of 'email'`,
    "string.empty": `'email' cannot be an empty field`,
    "any.required": `missing required 'email' field`,
  }),
  password: Joi.string()
    .min(6)
    .max(16)
    .pattern(passwordRegexp)
    .required()
    .messages({
      "string.empty": `'password' cannot be an empty field`,
      "any.required": `missing required 'password' field`,
      "string.min": `Password is too short, min 3`,
      "string.max": `Password is too long, max 16`,
      "string.pattern.base": `Password must contain at least one uppercase letter, one lowercase letter, and one digit`,
    }),
});

const userLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.pattern.base": `'email' should be a type of 'email'`,
    "string.empty": `'email' cannot be an empty field`,
    "any.required": `missing required 'email' field`,
  }),
  password: Joi.string()
    .min(6)
    .max(16)
    .pattern(passwordRegexp)
    .required()
    .messages({
      "string.empty": `'password' cannot be an empty field`,
      "any.required": `missing required 'password' field`,
      "string.min": `Password is too short, min 3`,
      "string.max": `Password is too long, max 16`,
      "string.pattern.base": `Password must contain at least one uppercase letter, one lowercase letter, and one digit`,
    }),
});

export default { userAddSchema, userLoginSchema };
