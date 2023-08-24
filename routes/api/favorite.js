import express from "express";
import {
  isEmptyBody,
  isValidId,
  authenticateToken,
} from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import { recipesSchemas } from "../../schemas/index.js";
import { favoriteRecipesController } from "../../controllers/index.js";

const { getFavoriteRecipes, addFavoriteRecipe, removeFavoriteRecipe } =
  favoriteRecipesController;
const { recipeAddSchema } = recipesSchemas;

const favoriteRecipesRouter = express.Router();

favoriteRecipesRouter.use(authenticateToken);

favoriteRecipesRouter.get("/", getFavoriteRecipes);

favoriteRecipesRouter.post(
  "/",
  isEmptyBody,
  validateBody(recipeAddSchema),
  addFavoriteRecipe
);

favoriteRecipesRouter.delete("/:id", isValidId, removeFavoriteRecipe);

export default favoriteRecipesRouter;
