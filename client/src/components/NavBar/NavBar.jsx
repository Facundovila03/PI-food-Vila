import styles from "./NavBar.module.css";
import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <>
      <div className={styles.Contenedor}>RINCÓN GASTRONÓMICO</div>
      <div className={styles.ContenedorNavegacion}>
        <Link
          to={"/"}
          className={pathname === "/info" ? styles.RutaActual : styles.Rutas}
        >
          <strong>Info</strong>
        </Link>
        <Link
          to={"/home"}
          className={pathname === "/home" ? styles.RutaActual : styles.Rutas}
        >
          <strong>Home</strong>
        </Link>
        <Link
          to={"/createRecipe"}
          className={
            pathname === "/createRecipe" ? styles.RutaActual : styles.Rutas
          }
        >
          <strong>Crea tu receta!</strong>
        </Link>
        <Link
          to={"/diets"}
          className={pathname === "/diets" ? styles.RutaActual : styles.Rutas}
        >
          <strong>Dietas</strong>
        </Link>
      </div>
    </>
  );
}
