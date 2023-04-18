import { useEffect, useState } from "react";
import NavPages from "../Navegador ed paginas/NavPages";
import Recipe from "../Recipe/Recipe";
import styles from "./RecipeList.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes } from "../../Redux/action";

export default function RecipeList() {
  // * peticion a axios donde recibo 100 dietas
  // * pongo un estado con la current page que empiece en 1
  // * si yo le doy al boton de ir adelante cambio el estado a etado +1 --- o si le doy a una pagina en particular configuro el estado al numero de ese boton
  // * que si el estado es igual a N --> tengo  que cambiar el array con el que voy a trabajar al array total hasta el indice N-1

  const [paginaActual, setPaginaActual] = useState(1);

  const dispatch = useDispatch();

  const recipesPerPage = 9;

  const allRecipes = useSelector((state) => state.allRecipes);

  const recetasEnPagina = paginaActual * recipesPerPage;
  const aux = recetasEnPagina - recipesPerPage;
  const recetasAMostrar = allRecipes.slice(aux, recetasEnPagina);

  const cambiarPagina = (x) => {
    setPaginaActual(x);
  };

  useEffect(() => {
    if (!allRecipes.length) {
      dispatch(getAllRecipes());
    }
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "85%" }}>
      <NavPages
        cambiarPagina={cambiarPagina}
        recipesPerPage={recipesPerPage}
        allRecipes={allRecipes}
        paginaActual={paginaActual}
      />
      <div className={styles.Contenedor}>
        {recetasAMostrar?.map((element) => {
          return (
            <Link
              to={`/recipe/${element.id}`}
              style={{ color: "black", textDecoration: "none" }}
            >
              <Recipe
                key={element.id}
                name={element.name}
                image={element.image}
                diets={element.diets}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
