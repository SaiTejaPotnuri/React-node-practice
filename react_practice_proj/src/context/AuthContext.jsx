import React, { useState, useEffect, createContext } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { firebaseAuth } from '../firebase/config';

/**
 * useContext will be used when you sharing same information to the different children or if children triggered some action and
 * something should happend any of its parents then we can use useContext
 * when we parent prop only using child not any other chid then we use props
 */

const AuthContext = createContext({
  isLoggedIn: false,
  loginHandler: () => {},
  logoutHandler: () => {},
  user: null,
  error: null,
  loading: true,
});
  
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") ? true : false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Get user token and store it
        currentUser.getIdToken().then(token => {
          localStorage.setItem("token", token);
          setIsLoggedIn(true);
        });
      } else {
        setUser(null);
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  
  const loginHandler = async (user) => {
    try {
      setError(null);
      const userCredential = await signInWithEmailAndPassword(firebaseAuth, user.userName, user.password);
      console.log(userCredential.user);
      const token = await userCredential.user.getIdToken();
      localStorage.setItem("token", token);
      setIsLoggedIn(true);
      setUser(userCredential.user);
      return userCredential.user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };
  
  const logoutHandler = async () => {
    try {
      await signOut(firebaseAuth); // Fixed: using firebaseAuth instead of auth
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      setUser(null);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };
  
  const contextValue = {
    isLoggedIn,
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