import { createContext, useState } from 'react';
import { loginApi } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); 

  const login = async (email, password) => {
    try {
      const res = await loginApi(email, password);
      setUser(res.data.user);
      localStorage.setItem('token', res.data.token);

      // Redirect based on role
      if (res.data.user.role === 'Owner') {
        navigate('/owner-dashboard');
      } else if (res.data.user.role === 'Admin') {
        navigate('/admin-dashboard'); 
      } else if (res.data.user.role === 'User') {
        navigate('/user-dashboard'); 
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
