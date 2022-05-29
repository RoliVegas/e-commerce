import { React, useEffect } from 'react'
import { getRedirectResult } from 'firebase/auth';

import { auth, 
         signInWithGooglePopup, 
         signInWithGoogleRedirect,    
         createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils.js';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component.jsx';
import SignInForm from '../../components/sign-in-form/sign-in-form.component.jsx';

const Authentication = () => {

    useEffect(async () => {
        const response = await getRedirectResult(auth);
        if(response) {
            const userDocRef = await createUserDocumentFromAuth(response.user);
        }
    }, []);

    const logGoogleUserRedirect = async () => {
        const { user } = await signInWithGoogleRedirect();
        createUserDocumentFromAuth(user);
    }

    return (
        <div>
            <h1>Sign In Page</h1>
            <SignInForm />
            <SignUpForm />
        </div>
  )
}

export default Authentication;