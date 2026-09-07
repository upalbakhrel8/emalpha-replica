import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

interface AuthProps {
  setIsLoggedIn: (value: boolean) => void;
}

function SignUp({ setIsLoggedIn }: AuthProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setIsLoading(true);
    setStatusMsg("");

    // --- 1. THE FAKE DATABASE CHECK ---
    // Look in the browser's memory for a list of registered emails
    const savedUsers = localStorage.getItem("emalpha_users");
    const usersArray = savedUsers ? JSON.parse(savedUsers) : [];

    // Check if the typed email is already in our list
    if (usersArray.includes(email)) {
      setStatusMsg("Account already exists. Please log in.");
      setIsLoading(false);
      return; // STOP THE FUNCTION HERE! Don't talk to the API.
    }
    // ----------------------------------

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        // --- 2. ADD TO FAKE DATABASE ---
        // Since it was successful, add this new email to our list and save it
        usersArray.push(email);
        localStorage.setItem("emalpha_users", JSON.stringify(usersArray));
        // -------------------------------

        setStatusMsg("Success! Redirecting to dashboard...");
        
        const fakeJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.simulated_token_signature";
        localStorage.setItem("emalpha_jwt_token", fakeJWT);
        
        setTimeout(() => {
          setIsLoggedIn(true); 
          navigate('/nepal-flood');
        }, 1500);
      } else {
        setStatusMsg("Error connecting to auth server.");
      }
    } catch (error) {
      setStatusMsg("Network error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-5 flex-grow-1 d-flex justify-content-center align-items-center">
      <div className="p-5 rounded-4" style={{ backgroundColor: "#0E1424", border: "1px solid #242d45", width: "100%", maxWidth: "400px" }}>
        <h3 className="text-white fw-bold mb-4 text-center">Create Account</h3>
        
        <form onSubmit={handleSignUp}>
          <div className="mb-3">
            <label className="form-label text-secondary">Email Address</label>
            <input type="email" className="form-control bg-dark text-white border-secondary" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          
          <div className="mb-4">
            <label className="form-label text-secondary">Password</label>
            <input type="password" className="form-control bg-dark text-white border-secondary" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-bold rounded-pill mb-3" disabled={isLoading} style={{ backgroundColor: "#4a6cf7" }}>
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>

          {/* Quick link to drive them to the SignIn page if they made a mistake */}
          <div className="text-center mt-2">
             <span className="text-secondary" style={{ fontSize: "14px" }}>Already have an account? </span>
             <Link to="/signin" className="text-primary text-decoration-none" style={{ fontSize: "14px" }}>Log in here</Link>
          </div>

          {statusMsg && (
            <div className={`mt-3 text-center ${statusMsg.includes("Success") ? "text-success" : "text-danger"}`}>
              {statusMsg}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default SignUp;