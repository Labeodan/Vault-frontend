const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`;
import axios from '../services/interceptors'
import { getToken } from "../utils/auth";

const index = async () => {
    try {
        const { data } = await axios.post(`${BASE_URL}/signup`, formData)
        const res = await fetch(BASE_URL);
        return res.json();
    } catch (err) {
        console.log(err);
    }
};

//transactions requests
const getTransactions = async ( ) => {
    try {
         
        const { data } = await axios.get(`${BASE_URL}/transactions`);

        return data;
    } catch (error) {
        console.log(error);
    }
}

export { index, getTransactions };