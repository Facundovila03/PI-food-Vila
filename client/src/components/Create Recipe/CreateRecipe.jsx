import { useEffect, useState } from "react";
import styles from "./CreateRecipe.module.css";
import { validate } from "./validation";
import { useDispatch, useSelector } from "react-redux";
import { crearReceta, pedirDietas } from "../../Redux/action";
import axios from "axios";

export default function CreateRecipe() {
  const dietas = useSelector((state) => state.allDiets);
  const dispatch = useDispatch();

  if (!dietas.length) {
    dispatch(pedirDietas());
  }

  const [input, setInput] = useState({
    name: "",
    image: "",
    summary: "",
    health_score: "",
    instructions: "",
    diets: [],
  });
  const [errors, setErrors] = useState({
    name: "",
    image: "",
    summary: "",
    health_score: "",
    instructions: "",
  });

  const crearRecipe = (arg) => {
    const endpoint = "http://localhost:3001/recipe";
    console.log(arg);
    axios
      .post(endpoint, arg)
      .then(() => {
        alert("Receta creada correctamente");
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };

  const handleChange = (event) => {
    event.preventDefault();
    const property = event.target.name;
    const value = event.target.value;
    setInput({ ...input, [property]: value });
    validate({ ...input, [property]: value }, errors, setErrors, property);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      errors.name ||
      errors.image ||
      errors.summary ||
      errors.health_score ||
      errors.instructions
    ) {
      alert("no se pudo crear la receta, controla los errores");
    } else crearRecipe(input);
  };
  const handleDiet = (event) => {
    if (!input.diets.includes(event.target.value)) {
      let aux = [...input.diets];
      aux.push(event.target.value);
      setInput({ ...input, ["diets"]: aux });
    } else {
      let aux = [...input.diets];
      aux.filter((element) => element !== event.target.value);
      setInput({ ...input, ["diets"]: aux });
    }
  };
  return (
    <div className={styles.Contenedor}>
      <div className={styles.ContenedorForm}>
        <form className={styles.Form} onSubmit={handleSubmit}>
          <div
            style={{
              padding: "1em",
            }}
          >
            <label className={styles.Name}>
              Nombre de la receta
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={input.name}
              />
            </label>
            <label className={styles.Image}>
              Link a la imagen
              <input
                type="text"
                name="image"
                onChange={handleChange}
                value={input.image}
              />
            </label>
            <label className={styles.Summary}>
              summary
              <textarea
                name="summary"
                onChange={handleChange}
                value={input.summary}
              />
            </label>
            <label className={styles.HealthScore}>
              Puntaje saludable: {input.health_score}
              <input
                type="range"
                min="0"
                max="100"
                name="health_score"
                onChange={handleChange}
                value={input.health_score}
              />
            </label>
            <label className={styles.Preparacion}>
              Preparacion
              <textarea
                name="instructions"
                onChange={handleChange}
                value={input.instructions}
              />
            </label>
          </div>
          <div style={{ height: "80%" }}>
            <span>Escoge las dietas:</span>
            <div className={styles.Dietas}>
              {dietas.length ? (
                dietas.map((element) => {
                  return (
                    <label>
                      <input
                        type="checkbox"
                        value={element.id}
                        name={element.name}
                        onChange={handleDiet}
                      />
                      {element.name}
                    </label>
                  );
                })
              ) : (
                <div>waiting...</div>
              )}
            </div>
            <button className={styles.SubmitButton}>Submit &#8594;</button>
          </div>
        </form>
      </div>
      <div className={styles.Resultado}>
        <p>
          <strong>
            Aqui puedes ver como quedara tu receta, ten cuidado con los errores!
          </strong>
        </p>
        <div
          style={{ border: "1px solid black", width: "250px", height: "250px" }}
        >
          {errors.image ? (
            <p style={{ Color: "red" }}>{errors.image}</p>
          ) : (
            <img
              src={input.image}
              style={{ height: "250px", width: "250px" }}
            />
          )}
        </div>
        <p
          style={
            errors.name ? { color: "rgb(77, 12, 12)" } : { color: "black" }
          }
        >
          <strong>Name: </strong>
          {errors.name ? errors.name : input.name}
        </p>
        <p
          style={
            errors.summary
              ? { color: "rgb(77, 12, 12)", fontStyle: "oblique" }
              : { color: "black" }
          }
        >
          <strong>Descripcion: </strong>{" "}
          {errors.summary ? errors.summary : input.summary}
        </p>
        <p
          style={
            errors.health_score
              ? { color: "rgb(77, 12, 12)", fontStyle: "oblique" }
              : { color: "black" }
          }
        >
          <strong>Puntaje saludable: </strong>{" "}
          {errors.health_score ? errors.health_score : input.health_score}
        </p>
        <p
          style={
            errors.instructions
              ? { color: "rgb(77, 12, 12)", fontStyle: "oblique" }
              : { color: "black" }
          }
        >
          <strong>Instrucciones: </strong>
          {errors.instructions ? errors.instructions : input.instructions}
        </p>
      </div>
    </div>
  );
}
