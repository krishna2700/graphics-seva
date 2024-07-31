import React, { createContext, useState, useEffect } from "react";
import { login as apiLogin, logout as apiLogout } from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");

    if (token && role) {
      setIsAuthenticated(true);
      setUserRole(role);
    } else {
      setIsAuthenticated(false);
      setUserRole("");
    }
  }, []);

  const login = async (email, password) => {
    const { role } = await apiLogin(email, password);
    setIsAuthenticated(true);
    setUserRole(role);
    return { role };
  };

  const logout = async () => {
    await apiLogout();
    setIsAuthenticated(false);
    setUserRole("");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
