import express from "express";

import { authController } from "../../controllers/index.js";

import { usersSchemas } from "../../schemas/index.js";
import { validateBody } from "../../decorators/index.js";

import {
  authenticateToken,
  isEmptyBody,
  upload,
} from "../../middlewares/index.js";

const { userAddSchema, userLoginSchema } = usersSchemas;

const { signUp, signIn, signOut, getCurrent, updateUser } = authController;

const authRouter = express.Router();

authRouter.post("/signup", isEmptyBody, validateBody(userAddSchema), signUp);
authRouter.post("/signin", isEmptyBody, validateBody(userLoginSchema), signIn);
authRouter.get("/signout", authenticateToken, signOut);
authRouter.get("/current", authenticateToken, getCurrent);

authRouter.post(
  "/update",
  authenticateToken,
  upload.single("avatarURL"),
  updateUser
);

export default authRouter;
