const { Router } = require("express");
const getRecipeDetail = require("../controllers/getRecipeDetail");
const createRecipe = require("../controllers/createRecipe");
const getAllDiets = require("../controllers/allDietsToDb");
const getRecipeByName = require("../controllers/getRecipeByName");
// Importar todos los routers;
// Ejemplo: const authRout er = require('./auth.js');

const router = Router();

router.get("/recipe/:idRecipe", getRecipeDetail); // ? recibe por params un id y busco esa recipe

router.get("/recipe", getRecipeByName); //? recibe por query (?) un nombre y debo buscar todas las recetas q coincidan

router.post("/recipe", createRecipe); //? recibe por body toda la info para crear una receta en la bdd

router.get("/diets", getAllDiets); //? la finalidad es obtener todas las dietas q hay  haciendo una requesta a la api
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
