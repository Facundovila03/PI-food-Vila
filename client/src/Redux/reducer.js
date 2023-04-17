import { PEDIR_DIETAS, TODAS_LAS_DIETAS } from "./action";

export const initialState = {
  allRecipes: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TODAS_LAS_DIETAS:
      return {
        ...state,
        allRecipes: action.payload.allRecipes,
      };
      break;

    default:
      break;
  }
};

export default reducer;
