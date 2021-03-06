import { useState } from "react";
import { signInWithGooglePopup, 
         createUserDocumentFromAuth,
         signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils.js';
import FormInput from '../form-input/form-input.component.jsx'
import './sign-in-form.styles.scss';
import Button from '../button/button.component.jsx';


const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {  email, password } = formFields;

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        createUserDocumentFromAuth(user);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response);
            setFormFields(defaultFormFields);
        } catch(error) {
            switch(error.code) {
                case "auth/wrong-password":
                    alert("Wrong password!");
                    break;
                
                case "auth/user-not-found":
                    alert("No user associated with this email!");
                    break;
                
                default:
                    alert(error.code);
                    break;
            }
        }
    }

    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password.</span>
            <form onSubmit={() => {}}>
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

                <div className="buttons-container">
                    <Button type="submit" onClick={handleSubmit} >Sign in</Button>
                    <Button type="button" buttonType='google' onClick={signInWithGoogle}>
                        Google sign in
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;