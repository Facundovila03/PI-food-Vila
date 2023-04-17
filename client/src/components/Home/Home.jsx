import RecipeList from "../Recipe List/RecipeList";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./Home.module.css";

export default function Home({ dietas }) {
  return (
    <div className={styles.Contenedor}>
      <Sidebar dietas={dietas} />
      <RecipeList />
    </div>
  );
}
