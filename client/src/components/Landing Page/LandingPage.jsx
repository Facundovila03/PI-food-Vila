import styles from "./LandingPage.module.css";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className={styles.Contenedor}>
      <div className={styles.DivLargo}>WELCOME</div>
      <div className={styles.Welcome}>
        <div
          style={{
            width: "30vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2>Muchas gracias por visitar mi pagina...</h2>
          <h4>
            Esta fue desarrollada por mi, Facundo Vila, con el fin de ser
            presentada como proyecto individual para el bootcamp de Soy henry
            del que formo parte. Dandole a next vas a poder adentrate en la
            parte de "home", donde podes buscar y crear recetas entre otros!! te
            espero del otro lado :)
          </h4>
          <Link to={"/home"} className={styles.Boton}>
            Next
          </Link>
        </div>
      </div>
    </div>
  );
}
