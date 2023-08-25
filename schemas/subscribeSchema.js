import Joi from "joi";

import { emailRegexp } from "../constants/regexp.js";

const subscribeSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.pattern.base": `'email' should be a type of 'email'`,
    "string.empty": `'email' cannot be an empty field`,
    "any.required": `missing required 'email' field`,
  }),
});

export default subscribeSchema;
