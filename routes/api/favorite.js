import express from "express";
import {
  isEmptyBody,
  isValidFavoriteId,
  isValidId,
  authenticateToken,
} from "../../middlewares/index.js";
import { favoriteRecipesController } from "../../controllers/index.js";

const { getFavoriteRecipes, addFavoriteRecipe, removeFavoriteRecipe } =
  favoriteRecipesController;

const favoriteRecipesRouter = express.Router();

favoriteRecipesRouter.use(authenticateToken);

favoriteRecipesRouter.get("/", getFavoriteRecipes);

favoriteRecipesRouter.post(
  "/",
  isEmptyBody,
  isValidFavoriteId,
  addFavoriteRecipe
);

favoriteRecipesRouter.delete("/:id", isValidId, removeFavoriteRecipe);

export default favoriteRecipesRouter;
