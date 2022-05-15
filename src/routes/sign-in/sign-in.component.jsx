import { React, useEffect } from 'react'
import { getRedirectResult } from 'firebase/auth';

import { auth, 
         signInWithGooglePopup, 
         signInWithGoogleRedirect,    
         createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils.js';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component.jsx';

const SignIn = () => {

    useEffect(async () => {
        const response = await getRedirectResult(auth);
        if(response) {
            const userDocRef = await createUserDocumentFromAuth(response.user);
        }
    }, []);

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        createUserDocumentFromAuth(user);
    }
    const logGoogleUserRedirect = async () => {
        const { user } = await signInWithGoogleRedirect();
        createUserDocumentFromAuth(user);
    }

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
            <button onClick={logGoogleUserRedirect}>Sign in with Google Redirect</button>
            <SignUpForm />
        </div>
  )
}

export default SignIn;