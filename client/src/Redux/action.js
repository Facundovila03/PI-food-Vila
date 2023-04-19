import axios from "axios";

export const PEDIR_DIETAS = "PEDIR_DIETAS";
export const TODAS_LAS_RECETAS = "TODAS_LAS_RECETAS";
export const DETAIL_RECETA = "DETAIL_RECETA";
export const FILTRO_ORIGIN = "FILTRO_ORIGIN";
export const FILTRO_DIETS = "FILTRO_DIETS";

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

export const filterDiets = (arg) => {
  const endpoint = "http://localhost:3001/recipe";
  console.log(arg);
  return (dispatch) => {
    axios.get(endpoint).then(({ data }) => {
      if (arg.length === 12 || arg.length === 0) {
        return dispatch({
          type: TODAS_LAS_RECETAS,
          payload: data,
        });
      } else {
        let recetasMatch = data.allRecipes.filter((element) => {
          if (element.diets.every((dieta) => typeof dieta === "string"))
            // * esto esta porque las recetas creadas en la db  tienen en diets un array de objetos con prop name, en lugar de una rray de strings
            return element.diets.some((dieta) => arg.includes(dieta));
          //* por ende, si todo el array contiene strings (every) entonces nos preguntamos si ese array (dietas) tiene algunos (some) de los valores en el array que le mandamos, si se cumple el some da truey por ende pasa el filter
          else {
            return element.diets.some((dieta) => arg.includes(dieta.name)); // * en el caso que el array no contenga strings, se hace el mismo proceso, tan solo que se accede a la prop name de cada obj
          }
        });
        console.log(recetasMatch);
        return dispatch({
          type: FILTRO_DIETS,
          payload: recetasMatch,
        });
      }
    });
  };
};
