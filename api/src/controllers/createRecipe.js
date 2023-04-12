require("dotenv").config();
const { Recipe } = require("../db");

const createRecipe = async (req, res) => {
  const { name, image, summary, health_score, instructions, dietas } = req.body;
  try {
    const [recipe, created] = await Recipe.findOrCreate({
      where: { name },
      defaults: {
        name,
        image,
        summary,
        health_score,
        instructions,
        dietas,
      },
    });
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
