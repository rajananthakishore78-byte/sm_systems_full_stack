import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext.jsx";

export default function AdminLogin() {
  const { login, isLoggedIn } = useAdminAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isLoggedIn) {
    navigate("/admin", { replace: true });
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(username, password);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-sm mx-auto px-4 py-20">
      <h1 className="text-2xl font-display font-semibold text-paper text-center">Admin Login</h1>
      <p className="mt-2 text-center text-sm text-paper/50">
        Manage products, offers and business info.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <div>
          <label className="block text-xs text-paper/50 mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full bg-night-900 border border-night-700 text-paper px-3 py-2 focus:outline-none focus:border-signal"
          />
        </div>
        <div>
          <label className="block text-xs text-paper/50 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-night-900 border border-night-700 text-paper px-3 py-2 focus:outline-none focus:border-signal"
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-signal text-night-950 font-semibold py-2.5 hover:bg-signal-light transition-colors disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}
