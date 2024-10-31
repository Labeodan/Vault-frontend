import { useState } from 'react';
import { signIn } from '../../services/authService';
import styles from './SignIn.module.scss'
import {Link, useNavigate} from "react-router-dom"

export const SignIn = ({ setUser }) => {
    const [signInData, setSignInData] = useState({
        username: '',
        password: '',

    });
    const navigate = useNavigate()
    const handleSignin = async () => {
        try {
            // Call to the sign up service, and log in the user automatically
            console.dir("handle sign up data " + signInData)
            console.log(signInData);
            const newUser = await signIn(signInData);
            if (newUser.error) {
                throw new Error(newUser.error);
            }
            console.log(newUser);
            setUser(newUser.user);
            navigate("/dashboard")

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
        handleSignin();
        setSignInData({
             username: '', 
             password: '', 
        });

    };
    return (
        <main className={styles.container}>
            <form onSubmit={handleSubmitForm}>
                <h1 className={styles.heading}>Sign In</h1>
                <div className={styles.fields}>
                    <div>
                        <label htmlFor="username"> Username</label>
                        <input
                            id="username"
                            name="username"
                            value={signInData.username}
                            onChange={handleChange}
                            required
                        /> 
                    </div>
                    <div>
                        <label htmlFor="password"> Password</label>
                        <input
                            type='password'
                            id="password"
                            name="password"
                            value={signInData.password}
                            onChange={handleChange}
                            required
                        /> 
                    </div>
                </div>


                <button type="submit">Sign In</button>
                <p className={styles.text}>OR</p>
                <button><Link className={styles.link}
                to={"/auth/signup"}>Sign Up</Link></button>

            </form>
        </main>

    );
}
