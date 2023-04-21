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
import RecipeDetail from "./components/Recipe detail/RecipeDetail";

function App() {
  const { pathname } = useLocation();

  return (
    <div className="App">
      {pathname !== "/" && <NavBar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/diets" element={<Diets />} /> */}
        <Route path="/createRecipe" element={<CreateRecipe />} />
        <Route path="/recipe/:id" element={<RecipeDetail prop={pathname} />} />
      </Routes>
    </div>
  );
}

export default App;
