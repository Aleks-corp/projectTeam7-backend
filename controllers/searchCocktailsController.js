import { ctrlWrapper } from "../decorators/index.js";
import Recipe from "../models/recipe.js";

const getByName = async (req, res) => {
  const { name, ingredient, category, page = 1, limit = 9 } = req.query;

  const skipAmount = (parseInt(page) - 1) * parseInt(limit);

  try {
    const query = {};

    if (name) {
      query.drink = { $regex: name, $options: "i" };
    }

    if (ingredient) {
      query["ingredients.title"] = ingredient;
    }

    if (category) {
      query.category = category;
    }

    const totalCocktailsCount = await Recipe.countDocuments(query).exec();
    const matchingCocktails = await Recipe.find(query)
      .skip(skipAmount)
      .limit(parseInt(limit));

    res.json({
      page: parseInt(page),
      perPage: parseInt(limit),
      totalCocktails: totalCocktailsCount,
      cocktails: matchingCocktails,
    });
  } catch (error) {
    res.status(500).json({ error: "No cocktails matched your request" });
  }
};

export default {
  getByName: ctrlWrapper(getByName),
};