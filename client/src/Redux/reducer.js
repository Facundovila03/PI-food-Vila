import { PEDIR_DIETAS } from "./action";

export const initialState = {
  allDiets: [],
};

const reducer = (state = initialState, action) => {
  if (action.type === PEDIR_DIETAS) {
    return {
      ...state,
      allDiets: action.payload,
    };
  }
};

export default reducer;
