import { Link, useNavigate } from 'react-router-dom';

interface NavbarProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

function Navbar({ isLoggedIn, setIsLoggedIn }: NavbarProps) {
  const navigate = useNavigate();

  const handleLogOut = () => {
    // 1. Delete the JWT token from the browser's storage
    localStorage.removeItem("emalpha_jwt_token");
    
    // 2. Flip the React memory to false
    setIsLoggedIn(false); 
    
    // 3. Kick them to the homepage
    navigate('/'); 
  };

  return (
    <nav className="navbar navbar-expand-lg px-5 py-3" style={{ backgroundColor: "#060A14" }}>
      <Link className="navbar-brand fw-bold text-primary" style={{ letterSpacing: "2px" }} to="/">
        EMALPHA
      </Link>
      
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mx-auto gap-4" style={{ fontSize: "14px" }}>
          <li className="nav-item">
            <Link className="nav-link text-white rounded-pill px-3" style={{ backgroundColor: "#1c2538" }} to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white opacity-75" to="/nepal-flood">Floods</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white opacity-75" to="/earthquake">Earthquakes</Link>
          </li>
        </ul>
        
        <div className="d-flex gap-3 align-items-center">
          {/* Conditional Rendering based on Global Memory */}
          {isLoggedIn ? (
            <button onClick={handleLogOut} className="btn btn-outline-danger rounded-pill px-4" style={{ fontSize: "14px" }}>
              Log Out
            </button>
          ) : (
            <>
              <Link to="/signin" className="text-white text-decoration-none opacity-75 me-2" style={{ fontSize: "14px" }}>Sign In</Link>
              <Link to="/signup" className="btn btn-primary rounded-pill px-4 border-0" style={{ backgroundColor: "#4a6cf7", fontSize: "14px" }}>Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;