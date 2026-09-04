import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg px-5 py-3" style={{ backgroundColor: "#060A14" }}>
      {/* 1. Left: Brand */}
      <Link className="navbar-brand fw-bold text-primary" style={{ letterSpacing: "2px" }} to="/">
        EMALPHA
      </Link>
      
      {/* 2. Middle: Links */}
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mx-auto gap-4" style={{ fontSize: "14px" }}>
          <li className="nav-item">
            <Link className="nav-link text-white rounded-pill px-3" style={{ backgroundColor: "#1c2538" }} to="/">Home</Link>
          </li>
          <li className="nav-item"><Link className="nav-link text-white opacity-75" to="/nepal-flood">Nepal Flood</Link></li>
          <li className="nav-item"><a className="nav-link text-white opacity-75" href="#">Insights</a></li>
          <li className="nav-item"><a className="nav-link text-white opacity-75" href="#">Security</a></li>
          <li className="nav-item"><a className="nav-link text-white opacity-75" href="#">About</a></li>
        </ul>
        
        {/* 3. Right: Buttons */}
        <div className="d-flex gap-3">
          <button className="btn btn-outline-light rounded-pill px-4" style={{ fontSize: "14px" }}>Try it</button>
          <button className="btn btn-primary rounded-pill px-4 border-0" style={{ backgroundColor: "#4a6cf7", fontSize: "14px" }}>Request a Demo</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;