import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";

import { getAuth, 
         signInWithRedirect, 
         signInWithPopup, 
         GoogleAuthProvider } from "firebase/auth";

import { getFirestore,
         doc,
         getDoc,
         setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBUOK_jdUhjKeVa1u-2xgMEk-5_0jtLRuM",
    authDomain: "crwn-clothing-db-acf71.firebaseapp.com",
    projectId: "crwn-clothing-db-acf71",
    storageBucket: "crwn-clothing-db-acf71.appspot.com",
    messagingSenderId: "430200212700",
    appId: "1:430200212700:web:74239b552bf0df7678f819"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
}