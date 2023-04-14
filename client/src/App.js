import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./components/Landing Page/LandingPage";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import Diets from "./components/Diets/Diets";
import CreateRecipe from "./components/Create Recipe/CreateRecipe";
import { useEffect } from "react";
import { pedirDietas } from "./Redux/action";

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    pedirDietas();
  }, []);

  return (
    <div className="App">
      {pathname !== "/" && <NavBar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/diets" element={<Diets />} />
        <Route path="/createRecipe" element={<CreateRecipe />} />
      </Routes>
    </div>
  );
}

export default App;
