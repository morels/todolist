import React, { useContext, useState, useEffect, useRef, PropsWithChildren } from 'react'
import { auth } from '../../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth'

type Context = {
    currentUser: User|null;
    login: (email: string, password: string) => ReturnType<typeof createUserWithEmailAndPassword>;
    signup: (email: string, password: string) => ReturnType<typeof signInWithEmailAndPassword>;
    logout: () => ReturnType<typeof signOut>;
};

const AuthContext = React.createContext<Context|null>(null);

const useAuth = () => useContext(AuthContext)!;

const AuthProvider = ({ children }: PropsWithChildren) => {
    const [currentUser, setCurrentUser] = useState<User |null>(null)
    const [loading, setLoading] = useState(true)

    const signup:Context['signup'] = (email, password) => createUserWithEmailAndPassword(auth, email, password)

    const login:Context['login'] = (email, password) => signInWithEmailAndPassword(auth, email, password)

    const logout:Context['logout'] = () => signOut(auth)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export { useAuth, AuthProvider };