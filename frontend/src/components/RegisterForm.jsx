import { useState } from "react";
import PropTypes from "prop-types";

function RegisterForm({ onRegister, loading }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Password strength validation
  function isStrongPassword(pw) {
    return pw.length >= 8 && /[A-Z]/.test(pw) && /[a-z]/.test(pw) && /[0-9]/.test(pw);
  }

  // Password strength meter
  function getStrength(pw) {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[a-z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++; // special char
    return score;
  }

  const strength = getStrength(password);
  const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
  const strengthColors = ["bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-blue-400", "bg-green-500"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!isStrongPassword(password)) {
      setError("Password must be at least 8 characters, include uppercase, lowercase, and a number.");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => {
        onRegister(); // Switch to login page
      }, 1200);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto bg-white/90 rounded-2xl shadow-2xl p-8 mt-16 flex flex-col gap-5 animate-fade-in border border-blue-100 relative overflow-hidden">
      {/* Decorative gradient background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-16 -left-16 w-48 h-48 bg-gradient-to-br from-blue-400 via-blue-200 to-blue-100 rounded-full opacity-30 blur-2xl"></div>
        <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-gradient-to-tr from-blue-600 via-blue-300 to-blue-100 rounded-full opacity-40 blur-2xl"></div>
      </div>
      <h2 className="text-3xl font-extrabold text-blue-800 text-center mb-2 tracking-tight z-10">Create Account</h2>
      {error && <div className="text-red-600 text-center font-semibold animate-shake z-10">{error}</div>}
      {success && <div className="text-green-600 text-center font-semibold animate-fade-in z-10">{success}</div>}
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
          autoComplete="new-password"
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
      <div className="flex items-center gap-2 z-10">
        <div className="flex-1 h-2 rounded bg-gray-200 overflow-hidden">
          <div className={`h-2 rounded transition-all duration-300 ${strengthColors[strength-1] || "bg-gray-200"}`} style={{ width: `${(strength/5)*100}%` }}></div>
        </div>
        <span className={`text-xs font-semibold ${strengthColors[strength-1] || "text-gray-400"}`}>{password ? strengthLabels[strength-1] || "" : ""}</span>
      </div>
      <div className="text-xs text-gray-500 text-center z-10">Password must be at least 8 characters, include uppercase, lowercase, and a number.</div>
      <button
        type="submit"
        className={`bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white font-bold rounded-lg p-2 shadow-md transition-all duration-200 z-10 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}

RegisterForm.propTypes = {
  onRegister: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default RegisterForm;
