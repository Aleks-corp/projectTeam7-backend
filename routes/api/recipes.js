import express from "express";
import { isValidId, authenticateToken } from "../../middlewares/index.js";
import { recipesController } from "../../controllers/index.js";

const {
  getRecipesForMain,
  getRecipeById,
  searchRecipes,
  getCategoryList,
  getGlassList,
  getIngredientsList,
} = recipesController;

const recipesRouter = express.Router();

recipesRouter.use(authenticateToken);

recipesRouter.get("/category", getCategoryList);
recipesRouter.get("/glass", getGlassList);
recipesRouter.get("/ingredients", getIngredientsList);

recipesRouter.get("/", getRecipesForMain);
recipesRouter.get("/:id", isValidId, getRecipeById);
recipesRouter.get("/search", searchRecipes);

export default recipesRouter;
