import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { borrarRecetaDetail, getRecipeDetail } from "../../Redux/action";
import styles from "./RecipeDetail.module.css";

export default function RecipeDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentRecipe = useSelector((state) => state.currentRecipe);

  useEffect(() => {
    if (!Object.keys(currentRecipe).length) {
      dispatch(getRecipeDetail(id));
    }
    return () => {
      dispatch(borrarRecetaDetail());
    };
  }, []);

  let aux = !!Object.keys(currentRecipe).length; // ? si el array que contiene  las keys esta vacio signfica q elobjeto no tiene nada por ende pone aux en false

  return (
    <div className={styles.Contenedor}>
      {aux ? (
        <div style={{ width: "100%", display: "flex" }}>
          <div className={styles.Datos}>
            <div className={styles.FondoDatos}>
              <img src={currentRecipe.image} alt="" />
              <p className={styles.Info}>Name: {currentRecipe.name}</p>
              <p className={styles.Info}>ID: {id}</p>
              <p className={styles.Info}>
                Puntaje saludable: {currentRecipe.healthScore}
              </p>
            </div>
          </div>
          <div className={styles.DatosLargos}>
            <div className={styles.FondoDatosLargos}>
              <p className={styles.Info}>
                {currentRecipe.summary?.replace(/<[^>]*>/g, "")}
              </p>
              <p className={styles.Info}>
                {currentRecipe.instructions?.replace(/<[^>]*>/g, "")}
              </p>
              <p>Dietas: </p>
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                {currentRecipe.diets ? (
                  isNaN(id) ? (
                    currentRecipe.diets.map((elem) => {
                      return <p className={styles.Info}>{elem.name}</p>;
                    })
                  ) : (
                    currentRecipe.diets.map((elem) => {
                      return <p className={styles.Info}>{elem}</p>;
                    })
                  )
                ) : (
                  <div>waiting for diets...</div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>waiting for info...</div>
      )}
    </div>
  );
}
