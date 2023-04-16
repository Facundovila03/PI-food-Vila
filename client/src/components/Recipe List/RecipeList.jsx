import Recipe from "../Recipe/Recipe";
import styles from "./RecipeList.module.css";

export default function RecipeList() {
  return (
    <div className={styles.Contenedor}>
      <Recipe />
      <Recipe />
      <Recipe />
      <Recipe />
      <Recipe />
      <Recipe />
      <Recipe />
      <Recipe />
      <Recipe />
    </div>
  );
}
