import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = sessionStorage.getItem("findr-demo-user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const login = (email, name = "USC Student") => {
    const account = { email, name };
    sessionStorage.setItem("findr-demo-user", JSON.stringify(account));
    setUser(account);
  };

  const logout = () => {
    sessionStorage.removeItem("findr-demo-user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: Boolean(user), login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
