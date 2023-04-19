import {
  PEDIR_DIETAS,
  TODAS_LAS_RECETAS,
  DETAIL_RECETA,
  FILTRO_ORIGIN,
  FILTRO_DIETS,
  SORT_ALFABETICO,
  SORT_SCORE,
} from "./action";

export const initialState = {
  allDiets: [],
  allRecipes: [],
  currentRecipe: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TODAS_LAS_RECETAS:
      return {
        ...state,
        allRecipes: action.payload.allRecipes,
      };
    case PEDIR_DIETAS:
      return {
        ...state,
        allDiets: action.payload,
      };
    case DETAIL_RECETA:
      return {
        ...state,
        currentRecipe: action.payload,
      };
    case FILTRO_ORIGIN:
      return {
        ...state,
        allRecipes: action.payload,
      };
    case FILTRO_DIETS:
      return {
        ...state,
        allRecipes: action.payload,
      };
    case SORT_ALFABETICO:
      let recetasOrdenadas = [...state.allRecipes];
      recetasOrdenadas =
        action.payload === "a-z"
          ? state.allRecipes.sort((a, b) => {
              if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
              if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
              return 0;
            })
          : state.allRecipes.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
              return 0;
            });
      console.log(recetasOrdenadas);
      return {
        ...state,
        allRecipes: recetasOrdenadas,
      };
    case SORT_SCORE:
      let recetasOrdenadasScore = [...state.allRecipes];
      recetasOrdenadasScore =
        action.payload === "min-max"
          ? state.allRecipes.sort((a, b) => {
              if (a.health_score > b.health_score) return 1;
              if (a.health_score < b.health_score) return -1;
              return 0;
            })
          : state.allRecipes.sort((a, b) => {
              if (a.health_score < b.health_score) return 1;
              if (a.health_score > b.health_score) return -1;
              return 0;
            });
      console.log(recetasOrdenadasScore);
      return {
        ...state,
        allRecipes: recetasOrdenadasScore,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
