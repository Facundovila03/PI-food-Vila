require("dotenv").config();
const { API_KEY } = process.env;
const { Recipe, Diet } = require("../db");
const axios = require("axios");

const getRecipeDetail = async (req, res) => {
  const { idRecipe } = req.params;
  if (Number(idRecipe)) {
    // * aca si lo que recibo es un numero o sea, la peticion a la api
    console.log("buscare en la api");
    await axios
      .get(
        `https://api.spoonacular.com/recipes/${idRecipe}/information?apiKey=${API_KEY}&addRecipeInformation=true`
      )
      .then(({ data }) => {
        const { title, image, summary, instructions, healthScore, diets } =
          data;
        res.json({
          name: title,
          image,
          summary,
          instructions,
          healthScore,
          diets,
        });
      });
  } else {
    //* sino se lo pido a mi bdd
    console.log("buscare en la bdd");
    try {
      const encontrado = await Recipe.findByPk(idRecipe, {
        include: {
          model: Diet,
          attirbutes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      res.status(200).json(encontrado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = getRecipeDetail;
