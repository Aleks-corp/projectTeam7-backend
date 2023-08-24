import express from "express";
import {
  isEmptyBody,
  isValidId,
  authenticateToken,
} from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import { recipesSchemas } from "../../schemas/index.js";
import { ownRecipesController } from "../../controllers/index.js";

const { getOwnRecipes, addOwnRecipe, removeOwnRecipe } = ownRecipesController;
const { recipeAddSchema } = recipesSchemas;

const ownRecipesRouter = express.Router();

ownRecipesRouter.use(authenticateToken);

ownRecipesRouter.get("/", getOwnRecipes);

ownRecipesRouter.post(
  "/",
  isEmptyBody,
  validateBody(recipeAddSchema),
  addOwnRecipe
);

ownRecipesRouter.delete("/:id", isValidId, removeOwnRecipe);

export default ownRecipesRouter;
