const { Recipe, Diet } = require("../db");
require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");

const getAllRecipes = async () => {
  const getApiRecipe = async () => {
    let aux = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    );

    let recetasApi = aux.data.results.map(
      ({ id, title, image, summary, instructions, diets, healthScore }) => {
        return {
          id,
          name: title,
          image,
          summary,
          instructions,
          diets,
          health_score: healthScore,
        };
      }
    );
    return recetasApi;
  };
  let recetasDB = await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  let recetasApi = await getApiRecipe();
  if (recetasDB.length > 0) {
    let allRecipes = recetasDB.concat(recetasApi);
    return allRecipes;
  } else {
    return recetasApi;
  }
};

module.exports = getAllRecipes;
