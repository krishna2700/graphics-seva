import { useState, useEffect } from "react";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("userRole");

      console.log("Token from localStorage:", token);
      console.log("Role from localStorage:", role);

      if (token && role) {
        setIsAuthenticated(true);
        setUserRole(role);
      } else {
        setIsAuthenticated(false);
        setUserRole("");
      }
    };

    checkAuth();
  }, []);

  return { isAuthenticated, userRole };
};

export default useAuth;
