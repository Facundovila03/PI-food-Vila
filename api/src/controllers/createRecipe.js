require("dotenv").config();
const { Recipe } = require("../db");

const createRecipe = async (req, res) => {
  const { name, image, summary, health_score, instructions, diets } = req.body;
  console.log({ name, image, summary, health_score, instructions, diets });
  console.log(Number(health_score));
  try {
    const [recipe, created] = await Recipe.findOrCreate({
      where: { name },
      defaults: {
        name,
        image,
        summary,
        health_score,
        instructions,
      },
    });
    recipe.addDiets(diets);
    if (created) {
      res.status(201).json({ recipe });
    } else {
      res.status(400).json({ error: "Recipe already exists" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = createRecipe;
