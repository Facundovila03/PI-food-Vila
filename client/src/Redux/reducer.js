import {
  PEDIR_DIETAS,
  TODAS_LAS_RECETAS,
  DETAIL_RECETA,
  FILTRO_ORIGIN,
  FILTRO_DIETS,
  SORT_ALFABETICO,
  SORT_SCORE,
  SEARCH_BY_NAME,
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
          ? recetasOrdenadas.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
              return 0;
            })
          : recetasOrdenadas.sort((a, b) => {
              if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
              if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
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
          ? recetasOrdenadasScore.sort((a, b) => {
              if (a.health_score > b.health_score) return 1;
              if (a.health_score < b.health_score) return -1;
              return 0;
            })
          : recetasOrdenadasScore.sort((a, b) => {
              if (a.health_score < b.health_score) return 1;
              if (a.health_score > b.health_score) return -1;
              return 0;
            });
      console.log(recetasOrdenadasScore);
      return {
        ...state,
        allRecipes: recetasOrdenadasScore,
      };
    case SEARCH_BY_NAME:
      return {
        ...state,
        allRecipes: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
