import {
  filterDiets,
  filterOrigen,
  pedirDietas,
  searchName,
  sortAlfabeticamente,
  sortScore,
} from "../../Redux/action";
import styles from "./Sidebar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const dispatch = useDispatch();

  const dietas = useSelector((state) => state.allDiets);
  const [order, setOrder] = useState("");

  const [origen, setOrigen] = useState([]);
  const [filtroDietas, setFiltroDietas] = useState([]);
  const [inputText, setInputText] = useState("");

  if (!dietas.length) {
    dispatch(pedirDietas());
  }

  const handleSubmitOrigen = (event) => {
    event.preventDefault();
    let aux = [...origen];
    console.log(aux);
    dispatch(filterOrigen(aux));
  };

  const handleSubmitDietas = (event) => {
    event.preventDefault();
    let aux = [...filtroDietas];
    console.log(aux);
    dispatch(filterDiets(aux));
  };

  const handleDiet = (event) => {
    if (!filtroDietas.includes(event.target.value))
      setFiltroDietas([...filtroDietas, event.target.value]);
    else {
      setFiltroDietas(
        filtroDietas.filter((element) => element !== event.target.value)
      );
    }
  };

  const handleOrigen = (event) => {
    if (!origen.includes(event.target.value))
      setOrigen([...origen, event.target.value]);
    else {
      setOrigen(origen.filter((element) => element !== event.target.value));
    }
  };

  const handleChange = (event) => {
    const valor = event.target.value;
    setInputText(valor);
  };

  const handleSortAlf = (event) => {
    event.preventDefault();
    console.log("cambio el select");
    dispatch(sortAlfabeticamente(event.target.value));
    setOrder(event.target.value);
  };

  const handleSortScore = (event) => {
    event.preventDefault();
    console.log("cambio el select Score");
    dispatch(sortScore(event.target.value));
    setOrder(event.target.value);
  };

  const handleSubmitName = (event) => {
    event.preventDefault();
    console.log(inputText);
    try {
      dispatch(searchName(inputText));
    } catch (error) {
      return error;
    }
  };

  return (
    <div className={styles.Contenedor}>
      <form
        onSubmit={handleSubmitName}
        style={{ display: "flex", width: "100%" }}
      >
        <input
          type="text"
          placeholder="Bucar receta..."
          className={styles.InputBusqueda}
          onChange={handleChange}
          value={inputText}
        />
        <button type="submit" className={styles.BotonBusqueda}>
          &#x1F50E;&#xFE0E;
        </button>
      </form>
      <br />
      <div className={styles.Filtros}>
        <h2>Filtrar por origen</h2>
        <form
          className={styles.Origen}
          onSubmit={(event) => handleSubmitOrigen(event)}
        >
          <label className={styles.RadioInput}>
            {" "}
            <input
              type="checkbox"
              name="FiltrarOrigen"
              value="online"
              onChange={(event) => handleOrigen(event)}
            />
            Online
          </label>
          <label className={styles.RadioInput}>
            {" "}
            <input
              type="checkbox"
              name="FiltrarOrigen"
              value="propias"
              onChange={(event) => handleOrigen(event)}
            />
            Propias
          </label>
          <button type="submit"> Filtrar</button>
        </form>
        <h2>Filtrar por dietas</h2>
        <form onSubmit={(event) => handleSubmitDietas(event)}>
          {dietas.length ? (
            dietas.map((element) => {
              return (
                <label className={styles.Dietas}>
                  <input
                    type="checkbox"
                    name="dietas"
                    value={element.name}
                    onChange={handleDiet}
                  />
                  {element.name}
                </label>
              );
            })
          ) : (
            <div>waiting</div>
          )}
          <button type="submit"> Filtrar</button>
        </form>
        <h2>Ordenar</h2>
        <div className={styles.Origen}>
          <select onChange={(event) => handleSortAlf(event)}>
            <option disabled selected>
              Orden alfabetico
            </option>
            <option value="a-z"> A - Z</option>
            <option value="z-a"> Z - A</option>
          </select>
          <select onChange={(event) => handleSortScore(event)}>
            <option disabled selected>
              {" "}
              Puntaje saludable{" "}
            </option>
            <option value="min-max">Min - Max</option>
            <option value="max-min">Max - Min</option>
          </select>
        </div>
      </div>
    </div>
  );
}
