import styles from "./Sidebar.module.css";

export default function Sidebar({ dietas }) {
  const auxDietas = dietas.split(",");

  console.log(auxDietas);

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
        {auxDietas.map((element) => {
          return (
            <label className={styles.Dietas}>
              <input type="checkbox" name="dietas" value={element} />
              {element}
            </label>
          );
        })}
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
