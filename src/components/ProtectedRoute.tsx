import React from 'react';
import { Link } from 'react-router-dom';

interface ProtectedRouteProps {
  isLoggedIn: boolean;
  children: React.ReactNode;
}

function ProtectedRoute({ isLoggedIn, children }: ProtectedRouteProps) {
  // If the user does NOT have the master switch turned on, show the Access Denied screen
  if (!isLoggedIn) {
    return (
      <div className="container py-5 flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center">
        <div className="p-5 rounded-4" style={{ backgroundColor: "#0E1424", border: "1px solid #242d45", maxWidth: "500px" }}>
          <h2 className="text-danger fw-bold mb-3">Access Denied</h2>
          <p className="text-secondary mb-4 fs-5">
            You are not logged in. You must have an active EMAlpha JWT token to view live intelligence dashboards.
          </p>
          <div className="d-flex gap-3 justify-content-center">
            <Link to="/signin" className="btn btn-primary rounded-pill px-4 fw-bold" style={{ backgroundColor: "#4a6cf7" }}>
              Sign In
            </Link>
            <Link to="/signup" className="btn btn-outline-light rounded-pill px-4 fw-bold">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If they ARE logged in, render the dashboard normally
  return <>{children}</>;
}

export default ProtectedRoute;