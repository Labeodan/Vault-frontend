import { useState } from 'react';
import styles from './SignUp.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../../services/authService';

export const SignUp = ({ setUser }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState(''); 
    const navigate = useNavigate();

    const handleSignUp = async () => {
        try {
            const newUser = await signUp(formData);
            if (newUser.error) {
                throw new Error(newUser.error);
            }
            setUser(newUser.user);
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
            setError(error.message); 
        }
    };

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match"); // Check if passwords match
            return;
        }
        handleSignUp();
        setFormData({ username: '', password: '', confirmPassword: '' });
    };

    return (
        <main className={styles.container}>
            <form onSubmit={handleSubmit}>
                <h1 className={styles.heading}>Sign up</h1>
                
                <div className={styles.fields}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            name="username"
                            value={formData.username}
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
                            value={formData.password}
                            onChange={handleChange}
                            required
                        /> 
                    </div>

                    <div>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                {error && <p className={styles.error}>{error}</p>} {/* Display error if exists */}
                
                <button type="submit">Sign Up</button>
                <p className={styles.text}>OR</p>
                <button>
                    <Link className={styles.link} to={"/auth/signin"}>Sign In</Link>
                </button>
            </form>
        </main>
    );
};
