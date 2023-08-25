const express = require("express");
const router = express.Router();
const controller = require("../../controller/searchCocktailsController");

router.get("/", controller.getByName);

module.exports = router;
