// src/contexts/UserContext.js

import React, { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext(null);

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // initialize user as null

  const login = (token, role, userName, id) => {
    // Assuming userName is passed during the login process
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("userName", userName); // Store userName in localStorage
    localStorage.setItem("id", id);
    setUser({ token, role, userName, id }); // Set user with userName
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName"); // Remove userName from localStorage
    localStorage.removeItem("id"); // Remove id from localStorage
    setUser(null);
  };

  /// Persist user state across refreshes
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const userName = localStorage.getItem("userName"); // Retrieve userName from localStorage
    if (token && role && userName) {
      setUser({ token, role, userName }); // Restore the user with userName
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
