const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Diet } = require("../db");

const dietsToDb = () => {
  //   let aux = [];
  try {
    axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
      )
      .then(({ data }) => {
        const arrayDietas = [];
        const aux = data.results.flatMap((element) => element.diets);
        data.results.forEach((element) => {
          if (element.vegetarian) arrayDietas.push("vegetarian");
          if (!element.lowFodmap) arrayDietas.push("lowFodmap");
        });
        aux.forEach((element) => {
          if (!arrayDietas.includes(element)) {
            arrayDietas.push(element);
          }
        });
        const aux2 = new Set(arrayDietas);
        console.log(aux2);
        return aux2;
      })
      .then((aux2) => {
        aux2.forEach((element) => {
          Diet.findOrCreate({
            where: { name: element },
            defaults: {
              name: element,
            },
          });
        });
      });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = dietsToDb;
