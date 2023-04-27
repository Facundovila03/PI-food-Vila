require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Recipe } = require("../db");
const { Op } = require("sequelize");
const getAllRecipes = require("./getAllRecipes");

const getRecipeByName = async (req, res) => {
  const { name } = req.query;

  let allRecipes = await getAllRecipes();
  if (name) {
    let recipesMatch = allRecipes.filter((element) =>
      element.name.toLowerCase().includes(name.toString().toLowerCase())
    );
    if (recipesMatch.length) {
      res.status(200).json({ recipesMatch });
    } else {
      res
        .status(400)
        .json({ error: "No se encontro una receta con ese nombre" });
    }
  } else {
    res.status(200).json({ allRecipes });
  }
};
module.exports = getRecipeByName;
