import { useParams } from 'react-router-dom';
import { useState } from 'react';


export const SignUpForm = ({ authService, user, setUser }) => {
    const [signUpData, setSignUpData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });

    const handleSignUp = async (formData) => {
        try {
            // Call to the sign up service, and log in the user automatically
            const newUser = await financeService.signUp(formData);
            if (newUser.error) {
                throw new Error(newUser.error);
            }
            console.log(newUser);
            setUser(newUser);

        } catch (error) {
            console.log(error)
        }
    };

    // handleChange function to update formData state
    const handleChange = (evt) => {
        console.log(signUpData);
        setSignUpData({ ...signUpData, [evt.target.name]: evt.target.value });
    };


    const handleSubmitForm = (evt) => {
        evt.preventDefault();
        handleSignUp(signUpData);
        setSignUpData({ username: '', password: '', confirmPassword: '', });
    };



    return (
        <main>
            <form onSubmit={handleSubmitForm}>
                <h2>Sign up form</h2>
                <label htmlFor="username"> Username:
                    <input
                        id="username"
                        name="username"
                        value={signUpData.username}
                        onChange={handleChange}
                        required
                    /> </label>
                <label htmlFor="password"> Password:
                    <input
                        type='password'
                        id="password"
                        name="password"
                        value={signUpData.password}
                        onChange={handleChange}
                        required
                    /> </label>

                <label htmlFor="confirmPassword"> Password:
                    <input
                        type='password'
                        id="confirmPassword"
                        name="confirmPassword"
                        value={signUpData.confirmPassword}
                        onChange={handleChange}
                        required
                    /> </label>

                <button type="submit">Sign Up</button>

            </form>
        </main>

    );
}
