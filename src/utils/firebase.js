import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { useState, useEffect } from "react";
import { getAuth, signOut, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, deleteUser} from "firebase/auth";

import { createUserDocument } from './actions'

const firebaseConfig = {
    apiKey: "AIzaSyDZ5pm6UKkZ4nwzTf9fdxp8LKIi1VC7ti0",
    authDomain: "fir-chat-1ef4f.firebaseapp.com",
    projectId: "fir-chat-1ef4f",
    storageBucket: "fir-chat-1ef4f.firebasestorage.app",
    messagingSenderId: "119990007107",
    appId: "1:119990007107:web:b736aa65c82b353fedabf6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const Users = collection(db, "users")


export async function googleSignInWithPopup() {
    try {
        const result = await signInWithPopup(auth, new GoogleAuthProvider());

        const user = result.user;

        createUserDocument(user)

    } catch (error) {
        ErrorLogger(error, "google SignIn Error")

        const email = error.customData?.email ?? "No email available";
        console.log("User Email:", email);
    }
}

export async function signOutUser() {
    try {
        await signOut(auth);
        console.log("User signed out successfully.");
    } catch (error) {
        ErrorLogger(error, "Error signing out")
    }
}


export async function deletedSignedInUser() {
    const user = auth.currentUser
    if (!user) {
        console.log("User not signed in")
        return
    }

    try {
        await deleteUser(user)
    } catch (err) {
        ErrorLogger(err, "Problem With deleteing User Account")
    }

}


export function useAuthState() {
    const [user, setUser] = useState(null)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, displayName, email, photoURL, emailVerified } = user

                setUser({
                    uid,
                    displayName,
                    email,
                    photoURL,
                    emailVerified,
                })

                setError(false)
            } else {
                setError(true)
                setUser(null)
            }

            setLoading(false)
        });


        return () => unsubscribe()
    }, [])

    return { user, error, authLoading: loading }
}



export function ErrorLogger(error, msg){
    const errorCode = error.code;
    const errorMessage = error.message;

    console.error("Error Code:", errorCode);
    console.error("Error Message:", errorMessage);

    console.log("Custom Message: ", msg)
}
