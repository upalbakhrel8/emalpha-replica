import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FloodDashboard from './components/FloodDashboard';
import EarthquakeDashboard from './components/EarthquakeDashboard';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute'; // Import our new Bouncer!

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Checks the browser's pocket (localStorage) the moment the website loads
  useEffect(() => {
    const savedToken = localStorage.getItem("emalpha_jwt_token");
    if (savedToken) {
      setIsLoggedIn(true); // Automatically log them back in if the wristband exists!
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: "#060A14" }}>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        
        <Routes>
          <Route path="/" element={<Hero />} />
          
          {/* PROTECTED ROUTES: Wrapped in the Bouncer component */}
          <Route path="/nepal-flood" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <FloodDashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/earthquake" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <EarthquakeDashboard />
            </ProtectedRoute>
          } />

          {/* PUBLIC ROUTES */}
          <Route path="/signup" element={<SignUp setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signin" element={<SignIn setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>
        
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;