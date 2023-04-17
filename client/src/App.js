import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./components/Landing Page/LandingPage";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import CreateRecipe from "./components/Create Recipe/CreateRecipe";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getAllRecipes } from "./Redux/action";

function App() {
  const { pathname } = useLocation();

  const [dietas, setDietas] = useState(window.localStorage.getItem("dietas"));
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/diets").then(({ data }) => {
      const arrDietas = data.flatMap((element) => element.name);
      window.localStorage.setItem("dietas", arrDietas);
    });
  }, []);

  return (
    <div className="App">
      {pathname !== "/" && <NavBar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home dietas={dietas} />} />
        {/* <Route path="/diets" element={<Diets />} /> */}
        <Route path="/createRecipe" element={<CreateRecipe />} />
      </Routes>
    </div>
  );
}

export default App;
