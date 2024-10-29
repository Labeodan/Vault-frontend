import { useParams } from 'react-router-dom';
import { useState } from 'react';


export const SignInForm = ({ authService, user, setUser }) => {

    const [signInData, setSignInData] = useState({
        username: '',
        password: '',

    });

    const handleSignUp = async (signInData) => {
        try {
            // Call to the sign up service, and log in the user automatically
            console.dir("hnadle sign up data " + signInData)
            console.log(signInData);
            const newUser = await authService.signIn(signInData);
            if (newUser.error) {
                throw new Error(newUser.error);
            }
            console.log(newUser);
            setUser(newUser);

        } catch (error) {
            console.log(error)
        }
    };

    // handleChange function to update signInData state
    const handleChange = (evt) => {
        console.log(signInData);
        setSignInData({ ...signInData, [evt.target.name]: evt.target.value });
    };


    const handleSubmitForm = (evt) => {
        evt.preventDefault();
        handleSignUp(signInData);
        setSignInData({ username: '', password: '', });
    };
    return (
        <main>
            <form onSubmit={handleSubmitForm}>
                <h2>Sign In form</h2>
                <label htmlFor="username"> Username:
                    <input
                        id="username"
                        name="username"
                        value={setSignInData.username}
                        onChange={handleChange}
                        required
                    /> </label>
                <label htmlFor="password"> Password:
                    <input
                        type='password'
                        id="password"
                        name="password"
                        value={setSignInData.password}
                        onChange={handleChange}
                        required
                    /> </label>

                <button type="submit">Sign Up</button>

            </form>
        </main>

    );
}
