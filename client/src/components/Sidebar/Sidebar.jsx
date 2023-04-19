import { filterDiets, filterOrigen, pedirDietas } from "../../Redux/action";
import styles from "./Sidebar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const dispatch = useDispatch();

  const dietas = useSelector((state) => state.allDiets);

  const [origen, setOrigen] = useState([]);
  const [filtroDietas, setFiltroDietas] = useState([]);

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

  return (
    <div className={styles.Contenedor}>
      <div style={{ display: "flex", width: "100%" }}>
        <input
          type="text"
          placeholder="Bucar receta..."
          className={styles.InputBusqueda}
        />
        <button className={styles.BotonBusqueda}>&#x1F50E;&#xFE0E;</button>
      </div>
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
          <label className={styles.RadioInput}>
            {" "}
            <input
              type="radio"
              name="AscendenteDescendente"
              value="ascendente"
            />
            Ascendente
          </label>
          <label className={styles.RadioInput}>
            {" "}
            <input
              type="radio"
              name="AscendenteDescendente"
              value="descendente"
            />
            Descendente
          </label>
          <hr className={styles.Divisor} />
          <div className={styles.Origen}>
            <label className={styles.RadioInput} style={{ width: "100%" }}>
              {" "}
              <input type="radio" name="healthAlphabetic" value="healthScore" />
              Puntaje saludable
            </label>
            <label className={styles.RadioInput}>
              {" "}
              <input
                type="radio"
                name="healthAlphabetic"
                value="alfabeticamente"
              />
              Alfabeticamente
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
