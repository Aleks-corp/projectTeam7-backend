import { Schema, model } from "mongoose";

import { handleUpdateValidator, handlerSaveError } from "./hooks.js";
import { glassList, categoryList } from "../constants/constants.js";

const ingredientSchema = new Schema({
  title: {
    type: String,
    required: [true, "Set at least one ingridient"],
  },
  measure: {
    type: String,
    required: [true, "Set ingredient's measure"],
  },
  ingredientThumb: String,
});

// const favoritesSchema = new Schema({
//   type: Schema.Types.ObjectId,
// });

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
      required: [true, "Set category for recipe"],
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
      required: true,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    favorites: {
      type: [Schema.Types.ObjectId],
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

recipeSchema.post("save", handlerSaveError);

recipeSchema.pre("findOneAndUpdate", handleUpdateValidator);
recipeSchema.post("findOneAndUpdate", handlerSaveError);

const Recipe = model("cocktail", recipeSchema);

export default Recipe;
