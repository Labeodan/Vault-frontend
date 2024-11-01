import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { removeToken } from "../../utils/auth";
import styles from "./Header.module.scss";

export const Header = ({ user, setUser }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleSignOut = () => {
        removeToken();
        setUser(null);
        navigate('/');
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className={styles.header}>
            <h1><Link to={"/"}>Vault</Link></h1>
            {user && <span className={styles.user}>Welcome, {user.username}!</span>}
            <button className={styles.hamburger} onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </button>
            <div className={`${styles.menuOverlay} ${menuOpen ? styles.open : ''}`} onClick={toggleMenu}></div>
            <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
                <ul>
                    {user ? (
                        <>
                            <li><Link to="/dashboard" onClick={() => setMenuOpen(false)}>Home</Link></li>
                            <li><Link to="/expenses" onClick={() => setMenuOpen(false)}>Transactions</Link></li>
                            <li><Link to="/expenses/new" onClick={() => setMenuOpen(false)}>Add Transaction</Link></li>
                            <li><Link to="/budget/new" onClick={() => setMenuOpen(false)}>Add Budget</Link></li>
                            <li><Link to="/" onClick={() => { handleSignOut(); setMenuOpen(false); }}>Sign Out</Link></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/auth/signin" onClick={() => setMenuOpen(false)}>Sign In</Link></li>
                            <li><Link to="/auth/signup" onClick={() => setMenuOpen(false)}>Sign Up</Link></li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};
