import { createContext, useState } from "react";
import { loginApi } from "../services/api";
import { useHistory } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const history = useHistory();

  const login = async (email, password) => {
    try {
      const res = await loginApi(email, password);
      setUser(res.data.user);
      localStorage.setItem("token", res.data.token);

      // Redirect based on role
      if (res.data.user.role === "Owner") {
        history.push("/owner-dashboard");
      } else if (res.data.user.role === "Admin") {
        history.push("/admin-dashboard");
      } else if (res.data.user.role === "User") {
        history.push("/user-dashboard");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
