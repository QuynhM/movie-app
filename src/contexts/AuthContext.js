import React, { useState, useContext, createContext } from "react";

const initialState = {
  user: "",
  password: "",
  signin: null,
  signout: null,
};

const AuthContext = createContext({ ...initialState });

function AuthProvider({ children }) {
  let [user, setUser] = useState("");
  // let [password, setPassword] = useState("");
  let signin = (newUser, callback) => {
    setUser(newUser);

    callback();
  };
  let signout = () => {
    setUser(null);
    // callback();
  };

  return (
    <AuthContext.Provider value={{ user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
}
export { AuthContext, AuthProvider };

export function useAuth() {
  return useContext(AuthContext);
}
