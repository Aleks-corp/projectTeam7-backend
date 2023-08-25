import express from "express";
import { authenticateToken } from "../../middlewares/index.js";
import { searchCocktailsController } from "../../controllers/index.js";

const searchRouter = express.Router();

searchRouter.use(authenticateToken);

searchRouter.get("/", searchCocktailsController.getByName);

export default searchRouter;
