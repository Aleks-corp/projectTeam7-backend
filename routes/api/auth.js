import express from "express";

import { authController } from "../../controllers/index.js";

import { usersSchemas } from "../../schemas/index.js";
import { validateBody } from "../../decorators/index.js";

import { authenticateToken, upload } from "../../middlewares/index.js";

const { userAddSchema, userLoginSchema } = usersSchemas;

const { signUp, signIn, signOut, getCurrent, updateUser } = authController;

const authRouter = express.Router();

authRouter.post("/signup", validateBody(userAddSchema), signUp);
authRouter.post("/signin", validateBody(userLoginSchema), signIn);
authRouter.get("/signout", authenticateToken, signOut);
authRouter.get("/current", authenticateToken, getCurrent);

authRouter.post(
  "/update",
  authenticateToken,
  upload.single("avatar"),
  updateUser
);

export default authRouter;
