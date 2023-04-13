require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Recipe } = require("../db");
const { Op } = require("sequelize");
//! teoricamente no necesito recibir todo porque cuando le de a search se van a ver cards  y ahi no muestro instructions por ej  y seguramente summary tmp
const getRecipeByName = (req, res) => {
  const { name } = req.query;
  try {
    axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${name}&apiKey=${API_KEY}&addRecipeInformation=true`
      )
      .then(async ({ data }) => {
        const aux1 = [];
        data.results.forEach((element) => {
          const { title, image, summary, instructions, diets, healthScore } =
            element;
          aux1.push({
            name: title,
            image,
            summary,
            instructions,
            diets,
            health_score: healthScore,
          });
        });
        const aux = await Recipe.findAll({
          where: {
            name: {
              [Op.iLike]: `${name}`,
            },
          },
        });
        if (aux.length !== 0) {
          aux.forEach((element) => {
            aux1.push(element);
          });
        }
        aux1.length === 0
          ? res
              .status(400)
              .json({ error: "No se encontro una receta con ese nombre" })
          : res.status(200).json(aux1); //* si no encuentra nada me tira un array vacio asi q ojo
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = getRecipeByName;
