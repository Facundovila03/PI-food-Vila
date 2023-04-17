import { useLocation } from "react-router-dom";
import axios from "axios";

export default function RecipeDetail() {
  const { pathname } = useLocation();
  console.log(pathname);

  return <div>aca vamos a ver el detalle de uan recipe</div>;
}
