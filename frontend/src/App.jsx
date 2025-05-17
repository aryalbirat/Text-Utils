import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import TextBox from "./components/TextBox";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("jwt_token") || "");
  const [showRegister, setShowRegister] = useState(false);

  // When token changes, update localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("jwt_token", token);
    } else {
      localStorage.removeItem("jwt_token");
    }
  }, [token]);

  const handleLogin = (jwt) => {
    setToken(jwt);
  };

  const handleLogout = () => {
    setToken("");
  };

  const handleRegister = () => {
    setShowRegister(false);
  };

  const handleRegisterSuccess = (jwt) => {
    setToken(jwt);
  };

  return (
    <>
      <Navbar onLogout={handleLogout} isLoggedIn={!!token} />
      {token ? (
        <TextBox />
      ) : showRegister ? (
        <>
          <RegisterForm onRegister={handleRegister} loading={false} onRegisterSuccess={handleRegisterSuccess} />
          <div className="text-center mt-4">
            <button className="text-blue-700 underline" onClick={() => setShowRegister(false)}>
              Already have an account? Login
            </button>
          </div>
        </>
      ) : (
        <>
          <LoginForm onLogin={handleLogin} loading={false} />
          <div className="text-center mt-4">
            <button className="text-blue-700 underline" onClick={() => setShowRegister(true)}>
              Don&apos;t have an account? Register
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default App;
