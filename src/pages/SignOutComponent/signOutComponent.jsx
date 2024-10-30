import { removeToken } from "../../src/utils/auth";
import { useNavigate } from "react-router";
export const SignOutElement = ({ setUser }) => {
    const handleSignOut = () => {
        removeToken()
        setUser(null)
        useNavigate('/')
    }
    return (<p onClick={handleSignOut}>Signout</p>)
}
