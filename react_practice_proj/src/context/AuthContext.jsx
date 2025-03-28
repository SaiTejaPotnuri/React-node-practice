import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import axiosHook from "../custom-hooks/axios-hook";

/**
 * useContext will be used when you sharing same information to the different children or if children triggered some action and
 * something should happend any of its parents then we can use useContext
 * when we parent prop only using child not any other chid then we use props
 */

const AuthContext = createContext({
  isLoggedIn: localStorage.getItem('token') ? true : false,
  loginHandler: async (user) => Promise.resolve(null),
  logoutHandler: () => {},
  user: null,
  error: null,
  loading: true,
});

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { verifyTokenInfo } = axiosHook();

  const LOGIN_URL = "http://localhost:3000/api";

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await verifyTokenInfo("/verify-token");
        if (response.success) {
          setUser(response.user);
          setIsLoggedIn(true);
        } else {
          // Token is invalid
          localStorage.removeItem("token");
          setIsLoggedIn(false);
          setUser(null);
        }
      }catch(err) {
        setError(err.message);
        setIsLoggedIn(false);
        localStorage.removeItem("token");
        setUser(null);
        // throw err;
      } finally {
        setLoading(false);
      }
    };
    verifyToken();
  }, []);

  const loginHandler = async (user) => {
    console.log("came to login handler");
    try {
      // setIsLoggedIn(true);

      const response = await axios.post(`${LOGIN_URL}/login`, {
        userName: user.userName,
        password: user.password,
      });

      if (response.data.success) {
        setError(null);
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user);
        setIsLoggedIn(true);
        return response.data.user;
      } else {
        setError(response.data.message || "Login failed");
        setIsLoggedIn(false);
        return null;
      }
    } catch (err) {
      setIsLoggedIn(false);
      setError(
        err.response?.data?.message || err.message || "An error occurred"
      );
      console.log(err.response?.data?.message || err.message);
      return null;
    }
  };

  const logoutHandler = async () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
  };
  console.log(isLoggedIn,"isLogged")
  const contextValue = {
    isLoggedIn ,
    loginHandler,
    logoutHandler,
    user,
    error,
    loading,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthContext;