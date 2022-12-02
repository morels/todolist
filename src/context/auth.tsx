import React, { useState, useEffect, PropsWithChildren } from "react";
import {
  signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User,
} from "firebase/auth";
import { auth } from "../../firebase";

type Context = {
    currentUser: User|null;
    login: (email: string, password: string) => ReturnType<typeof createUserWithEmailAndPassword>;
    signup: (email: string, password: string) => ReturnType<typeof signInWithEmailAndPassword>;
    logout: () => ReturnType<typeof signOut>;
};

const AuthContext = React.createContext<Context|null>(null);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [currentUser, setCurrentUser] = useState<User |null>(null);
  const [loading, setLoading] = useState(true);

  const signup:Context["signup"] = (email, password) => createUserWithEmailAndPassword(auth, email, password);

  const login:Context["login"] = (email, password) => signInWithEmailAndPassword(auth, email, password);

  const logout:Context["logout"] = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = React.useMemo<Context>(() => ({
    currentUser,
    login,
    signup,
    logout,
  }), [currentUser]);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const useAuth = () => React.useContext(AuthContext)!;

export { useAuth, AuthProvider };
