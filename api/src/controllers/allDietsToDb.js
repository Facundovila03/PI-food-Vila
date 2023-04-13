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
        console.log(aux);
        aux.forEach((element) => {
          if (!arrayDietas.includes(element)) {
            arrayDietas.push(element);
          }
        });
        return arrayDietas;
      })
      .then((arrayDietas) => {
        arrayDietas.forEach((element) => {
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
        console.log(dietas);
        res.status(200).json(dietas);
      });
  } catch (error) {}
};

module.exports = getAllDiets;
