import axios from "axios";

export const PEDIR_DIETAS = "PEDIR_DIETAS";

export const pedirDietas = () => {
  const endpoint = "http://localhost:3001/diets";
  console.log("llegue aca ");
  return (dispatch) => {
    axios.get(endpoint).then(({ data }) => {
      return dispatch({
        type: PEDIR_DIETAS,
        payload: data,
      });
    });
  };
};
