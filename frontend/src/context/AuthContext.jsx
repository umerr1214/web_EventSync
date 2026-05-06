// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import * as authService from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const me = await authService.me();
        if (!cancelled) setUser(me);
      } catch {
        // no token / invalid token is fine
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = async (email, password) => {
    setError(null);
    const data = await authService.login({ email, password });
    setUser({ _id: data._id, email: data.email, role: data.role, societyName: data.societyName });
    return data;
  };

  const register = async (email, password, role = "student", societyName) => {
    setError(null);
    const data = await authService.register({ email, password, role, societyName });
    setUser({ _id: data._id, email: data.email, role: data.role, societyName: data.societyName });
    return data;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, isLoading, error, setError, login, register, logout }),
    [user, isLoading, error]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);