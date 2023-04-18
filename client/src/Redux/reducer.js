import { PEDIR_DIETAS, TODAS_LAS_RECETAS, DETAIL_RECETA } from "./action";

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
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
