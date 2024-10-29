import { Link } from "react-router-dom";
import { removeToken } from "../../utils/auth";

export const Header = ({ user, setUser }) => {

    const handleSignOut = () => {
        removeToken()
        setUser(null)
        useNavigate('/')
    }

    return (
        <header>
            <h1>Vault</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/expenses">Expenses</Link>
                    </li>
                    <li>
                        <Link to="/addExpense">Add Expenses</Link>
                    </li>

                    {user ?
                        <>
                            <li><Link to="/" onClick={handleSignOut}>Sign Out</Link></li>
                        </>
                        :
                        <>
                            <li><Link to="/auth/signin">Sign In</Link></li>
                            <li><Link to="/auth/signup">Sign Up</Link></li>
                        </>
                    }
                </ul>
            </nav>
        </header>
    )
}