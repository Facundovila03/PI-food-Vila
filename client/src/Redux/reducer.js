import {
  PEDIR_DIETAS,
  TODAS_LAS_RECETAS,
  DETAIL_RECETA,
  FILTRO_ORIGIN,
  FILTRO_DIETS,
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
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
