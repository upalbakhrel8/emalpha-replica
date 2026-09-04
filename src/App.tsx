import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FloodDashboard from "./components/FloodDashboard";

function App() {
  return (
    <BrowserRouter>
      // Applied the same #060A14 dark background to the master file
      <div
        className="d-flex flex-column min-vh-100"
        style={{ backgroundColor: "#060A14" }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/nepal-flood" element={<FloodDashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

{
  /* Practicing my Git workflow today */
}
