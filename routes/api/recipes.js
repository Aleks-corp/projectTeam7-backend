import express from "express";
import { isValidId, authenticateToken } from "../../middlewares/index.js";
import { recipesController } from "../../controllers/index.js";

const {
  getRecipesForMain,
  getRecipeById,
  getCategoryList,
  getGlassList,
  getIngredientsList,
  getPopularRecipes,
} = recipesController;

const recipesRouter = express.Router();

recipesRouter.use(authenticateToken);

recipesRouter.get("/category", getCategoryList);
recipesRouter.get("/glass", getGlassList);
recipesRouter.get("/ingredients", getIngredientsList);

recipesRouter.get("/popular", getPopularRecipes);
recipesRouter.get("/", getRecipesForMain);
recipesRouter.get("/:id", isValidId, getRecipeById);

export default recipesRouter;
