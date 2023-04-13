const { Op } = require("sequelize");
const { Diet } = require("../db");
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;

const getAllDiets = (req, res) => {
  try {
    axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`
      )
      .then(({ data }) => {
        const arrayDietas = [];
        const aux = data.results.flatMap((e) => e.diets);
        // res.json(data.results);
        data.results.forEach((element) => {
          if (element.vegetarian) arrayDietas.push("vegetarian"); //*pusheo vegetarian que esta fuera del array de diets
          if (!element.lowFodmap) arrayDietas.push("lowFodmap");
          return;
        });
        aux.forEach((element) => {
          //*por cada elemento de results me pregunto si ya esta en el array, si no esta lo pusheo si esta sigue el for
          if (!arrayDietas.includes(element)) {
            arrayDietas.push(element);
          }
        });
        const aux2 = new Set(arrayDietas); //* hago un set pq vegetarian me traia repetidos
        return aux2;
      })
      .then(async (aux2) => {
        aux2.forEach((element) => {
          Diet.findOrCreate({
            where: { name: element },
            defaults: {
              name: element,
            },
          });
        });
      })
      .then(async () => {
        const dietas = await Diet.findAll();
        res.status(200).json(dietas);
      });
  } catch (error) {
    res.status(500), json({ error: error.message });
  }
};

module.exports = getAllDiets;
