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

  console.log(currentRecipe);

  let aux = !!Object.keys(currentRecipe).length; // ? si el array que contiene  las keys esta vacio signfica q elobjeto no tiene nada por ende pone aux en false

  return (
    <div className={styles.Contenedor}>
      {aux ? (
        <div>
          <p>{currentRecipe.name}</p>
          <p>{id}</p>
          <img src={currentRecipe.image} alt="" />
          <p>{currentRecipe.summary?.replace(/<[^>]*>/g, "")}</p>
          <p>{currentRecipe.instructions?.replace(/<[^>]*>/g, "")}</p>
          <p>{currentRecipe.healthScore}</p>
          {currentRecipe.diets ? (
            isNaN(id) ? (
              currentRecipe.diets.map((elem) => {
                return <p>{elem.name}</p>;
              })
            ) : (
              currentRecipe.diets.map((elem) => {
                return <p>{elem}</p>;
              })
            )
          ) : (
            <div>waiting for diets...</div>
          )}
        </div>
      ) : (
        <div>waiting for info...</div>
      )}
    </div>
  );
}
