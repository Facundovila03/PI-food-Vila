import { useEffect, useState } from "react";
import styles from "./CreateRecipe.module.css";
import { validate } from "./validation";
import { useDispatch, useSelector } from "react-redux";
import { crearReceta, pedirDietas } from "../../Redux/action";

export default function CreateRecipe({ crearRecipe }) {
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

  const handleChange = (event) => {
    event.preventDefault();
    const property = event.target.name;
    const value = event.target.value;
    setInput({ ...input, [property]: value });
    validate({ ...input, [property]: value }, errors, setErrors, property);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    crearRecipe(input);
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
          <p>{errors.name}</p>
          <p>{errors.image}</p>
          <p>{errors.summary}</p>
          <p>{errors.health_score}</p>
          <p>{errors.instructions}</p>
          <label>
            Nombre de la receta
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={input.name}
            />
          </label>
          <label>
            Link a la imagen
            <input
              type="text"
              name="image"
              onChange={handleChange}
              value={input.image}
            />
          </label>
          <label>
            summary
            <textarea
              name="summary"
              onChange={handleChange}
              value={input.summary}
            />
          </label>
          <label>
            Puntaje saludable
            <input
              type="range"
              min="0"
              max="100"
              name="health_score"
              onChange={handleChange}
              value={input.health_score}
            />
          </label>
          <label>
            Preparacion
            <textarea
              name="instructions"
              onChange={handleChange}
              value={input.instructions}
            />
          </label>
          <div>
            {dietas.length ? (
              dietas.map((element) => {
                return (
                  <label>
                    {element.name}
                    <input
                      type="checkbox"
                      value={element.id}
                      name={element.name}
                      onChange={handleDiet}
                    />
                  </label>
                );
              })
            ) : (
              <div>waiting...</div>
            )}
          </div>
          <button>Submit</button>
        </form>
      </div>
      <div className={styles.Resultado}>
        aca voy a mostrar como un "resultado" en caso de creacion correcta o no
      </div>
    </div>
  );
}
