
import { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { auth } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";


const AuthContext = createContext();
export const useAuth = () => {
    return useContext(AuthContext)
}

const googleProvider = new GoogleAuthProvider();

//Auth provider
export const AuthProvide = ({ children }) => {

    const [currentuser, setCurrentuser] = useState(null)
    const [loading, setLoading] = useState(true);

    //User registration
    const registerUser = async (email, password) => {
        return await createUserWithEmailAndPassword(auth, email, password);
    }

    //User login
const loginUser = async(email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
}

// Google Sign-in
const SignInWithGoogle = async() => {
    return await signInWithPopup(auth, googleProvider)
   
}

//Logout 
const logout = () => {
    return signOut(auth)
}

//Manage user data
useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentuser(user);
        setLoading(false);

        if (user) {
            const {email, displayName, photoURL} = user;
            const userData = {
                email, username: displayName, photo: photoURL
            }

            
        }
    })

    return () => unsubscribe();
},[])

    const value = {
        currentuser,
        registerUser,
        loginUser,
        SignInWithGoogle,
        logout


    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}