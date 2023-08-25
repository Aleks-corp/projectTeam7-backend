const Recipe = require("../models/search");
const { Wrapper } = require("../helpers");

const getByName = async (req, res) => {
  const { name, ingredient, category, page = 1, perPage = 9 } = req.query;

  const skipAmount = (parseInt(page) - 1) * parseInt(perPage);

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
      .limit(parseInt(perPage));

    res.json({
      page: parseInt(page),
      perPage: parseInt(perPage),
      totalCocktails: totalCocktailsCount,
      cocktails: matchingCocktails,
    });
  } catch (error) {
    res.status(500).json({ error: "No cocktails matched your request" });
  }
};

module.exports = {
  getByName: Wrapper(getByName),
};
