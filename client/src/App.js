import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/Landing Page/LandingPage";

function App() {
  return (
    <div className="App">
      <script>console.log('hola')</script>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;
