import axios from 'axios'
import { setToken } from '../utils/auth' //contains functions to deal with the localStorage token

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/auth`;

export const signUp = async (formData) => {
    try {
        const { data } = await axios.post(`${BASE_URL}/signup`, formData)

        if (data.token) {
            setToken(data.token)
        }
        console.log(data);
        return data
    } catch (err) {
        console.log(err);
    }
};

export const signIn = async (formData) => {
    // Sign up a user
    const { data } = await axios.post(`${BASE_URL}/signin`, formData)

    // Set the token to local storage
    if (data.token) {
        setToken(data.token)
    }
    console.log(data);
    return data
}

