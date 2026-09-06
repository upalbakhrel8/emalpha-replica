import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FloodDashboard from './components/FloodDashboard';
import EarthquakeDashboard from './components/EarthquakeDashboard';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Footer from './components/Footer';

function App() {
  // The Global Memory: Tracks if the user is logged in across the whole website
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: "#060A14" }}>
        {/* Pass the memory and the trigger down to the Navbar */}
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/nepal-flood" element={<FloodDashboard />} />
          <Route path="/earthquake" element={<EarthquakeDashboard />} />
          {/* Pass the trigger down to the Auth pages so they can log the user in */}
          <Route path="/signup" element={<SignUp setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signin" element={<SignIn setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>
        
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;