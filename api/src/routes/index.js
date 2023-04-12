const { Router } = require("express");
const getRecipeDetail = require("../controllers/getRecipeDetail");
const createRecipe = require("../controllers/createRecipe");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get("/recipes/:idRecipe", getRecipeDetail); // ? recibe por params un id y busco esa recipe, como ? no se pq las recipes tienen un uuid

router.get("/recipes/name"); //? recibe por query (?) un nombre y debo buscar todas las recetas q coincidan--> iLike para q no se acase sensitive

router.post("/recipes", createRecipe); //? recibe por body toda la info para crear una receta en la bdd

router.get("/diets"); //? la finalidad es obtener todas las dietas q hay  haciendo una requesta a la api
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
