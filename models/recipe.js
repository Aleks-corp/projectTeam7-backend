import { Schema, model } from "mongoose";

import { handleUpdateValidator, handlerSaveError } from "./hooks.js";
import { glassList, categoryList } from "../constants/constants.js";
import { ingredientSchema } from "./ingredient.js";

const recipeSchema = new Schema(
  {
    drink: {
      type: String,
      required: [true, "Set title for recipe"],
    },

    drinkAlternate: {
      type: String,
    },

    tags: {
      type: String,
    },

    video: {
      type: String,
    },

    category: {
      type: String,
      enum: categoryList,
      required: [true, "Set title for recipe"],
    },

    IBA: {
      type: String,
    },

    alcoholic: {
      type: String,
    },

    glass: {
      type: String,
      enum: glassList,
      required: [true, "Set glass for recipe"],
    },

    instructions: {
      type: String,
      required: [true, "Set instruction for recipe"],
    },

    drinkThumb: {
      type: String,
      required: [true, "Set image for recipe"],
    },

    ingredients: {
      type: [ingredientSchema],
      ref: "ingredient",
      required: [true, "Set title for recipe"],
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    favorites: {
      type: String,
      required: [true, "Set title for recipe"],
    },
  },
  { versionKey: false, timestamps: true }
);

recipeSchema.post("save", handlerSaveError);

recipeSchema.pre("findOneAndUpdate", handleUpdateValidator);
recipeSchema.post("findOneAndUpdate", handlerSaveError);

const Recipe = model("cocktail", recipeSchema);

export default Recipe;