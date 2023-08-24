import express from "express";
import cors from "cors";

import recipesRouter from "./routes/api/recipes.js";
import authRouter from "./routes/api/auth.js";
import ownRecipesRouter from "./routes/api/own.js";
import favoriteRecipesRouter from "./routes/api/favorite.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/auth", authRouter);
app.use("/recipes", recipesRouter);
app.use("/own", ownRecipesRouter);
app.use("/favorite", favoriteRecipesRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((error, req, res, next) => {
  if (!error.status) {
    error.status = 500;
  }
  const { status, message } = error;
  res.status(status).json({ message });
});

export default app;
