import express from "express";

import { subscribeController } from "../../controllers/index.js";
import subscribeSchema from "../../schemas/index.js";

import { validateBody } from "../../decorators/index.js";
import { authenticateToken, isEmptyBody } from "../../middlewares/index.js";

const { subscribe } = subscribeController;

const subscribeRouter = express.Router();

subscribeRouter.use(authenticateToken);

subscribeRouter.post(
  "/",
  isEmptyBody,
  validateBody(subscribeSchema),
  subscribe
);

export default subscribeRouter;
