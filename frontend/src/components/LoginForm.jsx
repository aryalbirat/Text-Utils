import { useState } from "react";
import PropTypes from "prop-types";

function LoginForm({ onLogin, loading }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      onLogin(data.token);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto bg-white rounded-2xl shadow-2xl p-8 mt-16 flex flex-col gap-6 animate-fade-in border border-blue-100 relative overflow-hidden"
    >
      {/* Decorative gradient background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-16 -left-16 w-48 h-48 bg-gradient-to-br from-blue-400 via-blue-200 to-blue-100 rounded-full opacity-30 blur-2xl"></div>
        <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-gradient-to-tr from-blue-600 via-blue-300 to-blue-100 rounded-full opacity-40 blur-2xl"></div>
      </div>
      <h2 className="text-3xl font-extrabold text-blue-800 text-center mb-2 tracking-tight z-10">Welcome Back</h2>
      <p className="text-center text-blue-500 font-medium text-base z-10">Sign in to your account</p>
      {error && <div className="text-red-600 text-center font-semibold animate-shake z-10">{error}</div>}
      <label className="flex flex-col gap-1 z-10">
        <span className="text-blue-700 font-semibold">Username</span>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="border-2 border-blue-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          required
          autoComplete="username"
        />
      </label>
      <label className="flex flex-col gap-1 relative z-10">
        <span className="text-blue-700 font-semibold">Password</span>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border-2 border-blue-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition pr-10"
          required
          autoComplete="current-password"
        />
        <button
          type="button"
          className="absolute right-2 top-8 text-xs text-blue-600 hover:underline"
          onClick={() => setShowPassword(v => !v)}
          tabIndex={-1}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </label>
      <button
        type="submit"
        className={`bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white font-bold rounded-lg p-2 shadow-md transition-all duration-200 z-10 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
      <div className="text-xs text-gray-400 text-center z-10">Forgot your password? <span className="text-blue-600 hover:underline cursor-pointer">Reset</span></div>
    </form>
  );
}

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default LoginForm;
