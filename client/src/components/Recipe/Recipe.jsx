import styles from "./Recipe.module.css";

export default function Recipe({ name, diets, image }) {
  const dietas = diets.map((element) => element);
  return (
    <div className={styles.Contenedor}>
      <img className={styles.Imagen} src={image} />
      <h3>{name}</h3>
      <div className={styles.Dietas}>
        {dietas.map((element) => {
          if (typeof element === "object") return <h4>{element.name}</h4>;
          else {
            return <h4>{element}</h4>;
          }
        })}
      </div>
    </div>
  );
}
