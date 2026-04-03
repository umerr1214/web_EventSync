// src/context/AuthContext.jsx
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // MOCK LOGIN (replace later with API)
    if (email && password) {
      const mockUser = {
        email,
        role: email.includes("admin")
          ? "admin"
          : email.includes("society")
          ? "society"
          : "student",
      };
      setUser(mockUser);
    }
  };

const register = (email, password, role = "student") => {
  const newUser = { email, role };
  setUser(newUser);
};

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);