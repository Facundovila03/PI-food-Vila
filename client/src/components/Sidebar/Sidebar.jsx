import { pedirDietas } from "../../Redux/action";
import styles from "./Sidebar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function Sidebar() {
  const dispatch = useDispatch();

  const dietas = useSelector((state) => state.allDiets);
  useEffect(() => {
    if (!dietas.length) {
      dispatch(pedirDietas());
    }
  }, []);

  dietas.length ? console.log(dietas) : console.log("waiting...");

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
        <div className={styles.Origen}>
          <label className={styles.RadioInput}>
            {" "}
            <input type="checkbox" name="FiltrarOrigen" value="Online" />
            Online
          </label>
          <label className={styles.RadioInput}>
            {" "}
            <input type="checkbox" name="FiltrarOrigen" value="Propias" />
            Propias
          </label>
        </div>
        <h2>Filtrar por dietas</h2>
        {dietas.length ? (
          dietas.map((element) => {
            return (
              <label className={styles.Dietas}>
                <input type="checkbox" name="dietas" value={element.name} />
                {element.name}
              </label>
            );
          })
        ) : (
          <div>waiting</div>
        )}
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
