import axios from "axios";

export const PEDIR_DIETAS = "PEDIR_DIETAS";
export const TODAS_LAS_DIETAS = "TODAS_LAS_DIETAS";

export const pedirDietas = () => {
  const endpoint = "http://localhost:3001/diets";
  console.log("estas pidiendo las dietas");
  return (dispatch) => {
    console.log("holaaa");
    axios.get(endpoint).then(({ data }) => {
      return dispatch({
        type: PEDIR_DIETAS,
        payload: data,
      });
    });
  };
};

export const getAllRecipes = () => {
  const endpoint = "http://localhost:3001/recipes";
  console.log("estas pidiendo todas las recetas");
  return (dispatch) => {
    axios.get(endpoint).then(({ data }) => {
      return dispatch({
        type: TODAS_LAS_DIETAS,
        payload: data,
      });
    });
  };
};
