import { Schema, model } from "mongoose";

import { handleUpdateValidator, handlerSaveError } from "./hooks.js";

export const ingredientSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Set title for ingredient"],
    },

    ingredientThumb: {
      type: String,
      required: [true, "Set image for ingredient"],
    },

    thumbMedium: { type: String },

    thumbSmall: { type: String },
  },
  { versionKey: false, timestamps: true }
);

ingredientSchema.post("save", handlerSaveError);

ingredientSchema.pre("findOneAndUpdate", handleUpdateValidator);
ingredientSchema.post("findOneAndUpdate", handlerSaveError);

const Ingredient = model("ingredient", ingredientSchema);

export default Ingredient;
