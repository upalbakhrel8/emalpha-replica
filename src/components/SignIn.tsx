import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthProps {
  setIsLoggedIn: (value: boolean) => void;
}

function SignIn({ setIsLoggedIn }: AuthProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setIsLoading(true);
    setStatusMsg("");

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users/1');

      if (response.ok) {
        setStatusMsg("Login successful! Issuing JWT...");
        
        // 1. SIMULATE RECEIVING A JWT FROM THE SERVER
        const fakeJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.simulated_token_signature";
        
        // 2. STORE THE JWT IN THE BROWSER'S LOCAL STORAGE
        localStorage.setItem("emalpha_jwt_token", fakeJWT);
        
        setTimeout(() => {
          setIsLoggedIn(true); 
          navigate('/nepal-flood');
        }, 1500);
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
        <h3 className="text-white fw-bold mb-4 text-center">Sign In</h3>
        
        <form onSubmit={handleSignIn}>
          <div className="mb-3">
            <label className="form-label text-secondary">Email Address</label>
            <input type="email" className="form-control bg-dark text-white border-secondary" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          
          <div className="mb-4">
            <label className="form-label text-secondary">Password</label>
            <input type="password" className="form-control bg-dark text-white border-secondary" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-bold rounded-pill" disabled={isLoading} style={{ backgroundColor: "#4a6cf7" }}>
            {isLoading ? "Authenticating..." : "Sign In"}
          </button>

          {statusMsg && (
            <div className={`mt-3 text-center ${statusMsg.includes("successful") ? "text-success" : "text-danger"}`}>
              {statusMsg}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default SignIn;