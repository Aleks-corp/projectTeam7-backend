import { ctrlWrapper } from "../decorators/index.js";
import Recipe from "../models/recipe.js";

const getByName = async (req, res) => {
  const { name, ingredient, category, page = 1, limit = 9 } = req.query;

  const skipAmount = (parseInt(page) - 1) * parseInt(limit);

  try {
    const query = {};

    name && (query.drink = { $regex: name, $options: "i" });

    ingredient && (query["ingredients.title"] = ingredient);

    category && (query.category = category);

    const totalCocktailsCount = await Recipe.count(query);
    const totalPages = Math.ceil(totalCocktailsCount / parseInt(limit));
    const matchingCocktails = await Recipe.find(query)
      .skip(skipAmount)
      .limit(parseInt(limit));

    res.json({
      page: parseInt(page),
      perPage: parseInt(limit),
      totalPages,
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
