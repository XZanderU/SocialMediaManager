import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserData } from '../../services/auth';// Asegúrate de tener estos servicios

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await getUserData(); // Obtener datos del usuario si está autenticado
        setUser(userData);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const isAuthenticated = () => {
    return user !== null; // Verifica si hay un usuario autenticado
  };

  return (
    <AuthContext.Provider value={{ user, loading, setUser, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
