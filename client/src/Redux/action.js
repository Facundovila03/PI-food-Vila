import axios from "axios";

export const PEDIR_DIETAS = "PEDIR_DIETAS";
export const TODAS_LAS_RECETAS = "TODAS_LAS_RECETAS";
export const DETAIL_RECETA = "DETAIL_RECETA";
export const FILTRO_ORIGIN = "FILTRO_ORIGIN";
export const FILTRO_DIETS = "FILTRO_DIETS";
export const SORT_ALFABETICO = "SORT_ALFABETICO";
export const SORT_SCORE = "SORT_SCORE";
export const SEARCH_BY_NAME = "SEARCH_BY_NAME";
export const CREAR_RECETA = "CREAR_RECETA";
export const BORRAR_RECETA_DETAIL = "BORRAR_RECETA_DETAIL";

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
  return (dispatch) => {
    axios.get(endpoint).then(({ data }) => {
      if (arg.length === 12 || arg.length === 0) {
        return dispatch({
          type: TODAS_LAS_RECETAS,
          payload: data,
        });
      } else {
        console.log(data.allRecipes);
        let recetasMatch = data.allRecipes.filter((element) => {
          console.log(element.diets);
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
export const sortAlfabeticamente = (value) => {
  console.log("llegamos a actions");
  return {
    type: SORT_ALFABETICO,
    payload: value,
  };
};
export const sortScore = (value) => {
  return {
    type: SORT_SCORE,
    payload: value,
  };
};

export const searchName = (value) => {
  const endpoint = `http://localhost:3001/recipe?name=${value}`;
  return (dispatch) => {
    try {
      axios.get(endpoint).then(({ data }) => {
        if (value) {
          // * aca si me pasaron un name
          return dispatch({
            type: SEARCH_BY_NAME,
            payload: data.recipesMatch,
          });
        } else {
          //* a ca si no
          return dispatch({
            type: TODAS_LAS_RECETAS,
            payload: data,
          });
        }
      });
    } catch {
      return alert("No se encontro receta con ese nombre");
    }
  };
};

export const crearReceta = (arg) => {
  const endpoint = "http://localhost:3001/recipe";
  return (dispatch) => {
    axios.post(endpoint, arg).then(() => {
      return dispatch({
        type: CREAR_RECETA,
        payload: arg,
      });
    });
  };
};

export const borrarRecetaDetail = () => {
  return {
    type: BORRAR_RECETA_DETAIL,
  };
};
