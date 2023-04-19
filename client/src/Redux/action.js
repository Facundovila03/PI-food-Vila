import axios from "axios";

export const PEDIR_DIETAS = "PEDIR_DIETAS";
export const TODAS_LAS_RECETAS = "TODAS_LAS_RECETAS";
export const DETAIL_RECETA = "DETAIL_RECETA";
export const FILTRO_ORIGIN = "FILTRO_ORIGIN";

export const pedirDietas = () => {
  const endpoint = "http://localhost:3001/diets";
  console.log("estas pidiendo las dietas");
  return (dispatch) => {
    axios.get(endpoint).then(({ data }) => {
      return dispatch({
        type: PEDIR_DIETAS,
        payload: data,
      });
    });
  };
};

export const getAllRecipes = () => {
  const endpoint = "http://localhost:3001/recipe";
  console.log("estas pidiendo todas las recetas");
  return (dispatch) => {
    axios.get(endpoint).then(({ data }) => {
      return dispatch({
        type: TODAS_LAS_RECETAS,
        payload: data,
      });
    });
  };
};
export const getRecipeDetail = (id) => {
  const endpoint = `http://localhost:3001/recipe/${id}`;
  console.log("estas pidiendo una receta especifica");
  return (dispatch) => {
    axios.get(endpoint).then(({ data }) => {
      return dispatch({
        type: DETAIL_RECETA,
        payload: data,
      });
    });
  };
};

export const filterOrigen = (arg) => {
  // ? arg siempre va a ser un array
  const endpoint = "http://localhost:3001/recipe";
  console.log(arg);
  return (dispatch) => {
    axios.get(endpoint).then(({ data }) => {
      if (arg.length === 1) {
        if (arg.toString() === "online") {
          const aux = data.allRecipes.filter((element) => Number(element.id));
          return dispatch({
            type: FILTRO_ORIGIN,
            payload: aux,
          });
        } else {
          const aux = data.allRecipes.filter((element) => isNaN(element.id));
          console.log(aux);
          return dispatch({
            type: FILTRO_ORIGIN,
            payload: aux,
          });
        }
      } else {
        return dispatch({
          type: TODAS_LAS_RECETAS,
          payload: data,
        });
      }
    });
  };
};
