import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils.js';
import FormInput from '../form-input/form-input.component.jsx'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(formFields.password != formFields.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, {displayName});


        } catch(error) {
            if(error.code === 'auth/email-already-in-use') {
                alert('Error: Email already used.');
            }

            console.log('User creation encountered an error: ',error);
        }

        setFormFields(defaultFormFields);
    }

    return (
        <div>
            <h1>Sign up with your email and password.</h1>
            <form onSubmit={() => {}}>
                <FormInput
                    label="Display Name"
                    type="text" 
                    required 
                    onChange={handleChange} 
                    name="displayName" 
                    value={displayName} 
                />
                <FormInput
                    label="Email"
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name="email" 
                    value={email} 
                />
                <FormInput
                    label="Password"
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="password" 
                    value={password} 
                />
                <FormInput
                    label="Confirm Password"
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="confirmPassword" 
                    value={confirmPassword} 
                />

                <button type="submit" onClick={handleSubmit}>Sign up</button>
            </form>
        </div>
    )
}

export default SignUpForm;