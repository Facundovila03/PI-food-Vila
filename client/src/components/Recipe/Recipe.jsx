import styles from "./Recipe.module.css";

export default function Recipe() {
  return (
    <div className={styles.Contenedor}>
      <img
        className={styles.Imagen}
        src="https://spoonacular.com/recipeImages/716429-312x231.jpg"
      />
      <h3>Milanesa</h3>
      <div className={styles.Dietas}>
        <h4>vegetarian</h4>
        <h4>dairy free</h4>
        <h4>Gluten free</h4>
      </div>
    </div>
  );
}
