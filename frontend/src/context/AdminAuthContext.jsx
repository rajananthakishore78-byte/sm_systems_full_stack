import React, { createContext, useContext, useState, useCallback } from "react";
import { api } from "../api";

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("admin_token"));
  const [username, setUsername] = useState(() => localStorage.getItem("admin_username"));

  const login = useCallback(async (user, pass) => {
    const data = await api.login(user, pass);
    localStorage.setItem("admin_token", data.token);
    localStorage.setItem("admin_username", data.username);
    setToken(data.token);
    setUsername(data.username);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_username");
    setToken(null);
    setUsername(null);
  }, []);

  const value = { token, username, isLoggedIn: !!token, login, logout };

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used inside AdminAuthProvider");
  return ctx;
}
