import { useState } from 'react';
import { signIn } from '../../services/authService';
import styles from './SignIn.module.scss';
import { Link, useNavigate } from "react-router-dom";

export const SignIn = ({ setUser }) => {
    const [signInData, setSignInData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState(''); // Add error state
    const navigate = useNavigate();

    const handleSignin = async () => {
        try {
            const newUser = await signIn(signInData);
            if (newUser.error) {
                throw new Error(newUser.error);
            }
            setUser(newUser.user);
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
            setError(error.message); // Set error message
        }
    };

    const handleChange = (evt) => {
        setSignInData({ ...signInData, [evt.target.name]: evt.target.value });
    };

    const handleSubmitForm = (evt) => {
        evt.preventDefault();
        setError(''); // Clear previous errors before attempting sign-in
        handleSignin();
        setSignInData({ username: '', password: '' });
    };

    return (
        <main className={styles.container}>
            <form onSubmit={handleSubmitForm}>
                <h1 className={styles.heading}>Sign In</h1>
                <div className={styles.fields}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            name="username"
                            value={signInData.username}
                            onChange={handleChange}
                            required
                        /> 
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={signInData.password}
                            onChange={handleChange}
                            required
                        /> 
                    </div>
                </div>

                {error && <p className={styles.error}>{error}</p>} {/* Display error if exists */}

                <button type="submit">Sign In</button>
                <p className={styles.text}>OR</p>
                <button>
                    <Link className={styles.link} to={"/auth/signup"}>Sign Up</Link>
                </button>
            </form>
        </main>
    );
};
