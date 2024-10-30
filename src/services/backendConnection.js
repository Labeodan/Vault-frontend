const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`;
import axios from '../services/interceptors'
import { getToken } from "../utils/auth";

//transactions requests
const getTransactions = async () => {
    try {

        const { data } = await axios.get(`${BASE_URL}/transactions`);

        return data;
    } catch (error) {
        console.log(error);
    }
}

const createTransaction = async (formData) => {
    try {

        const { data } = await axios.post(`${BASE_URL}/transactions`, formData);

        return data;
    } catch (error) {
        console.log(error);
    }
}

const singleTransaction = async (id) => {
    try {

        const { data } = await axios.get(`${BASE_URL}/transactions/${id}`);

        return data;
    } catch (error) {
        console.log(error);
    }
}

const editTransaction = async (id, formData) => {
    try {

        const { data } = await axios.put(`${BASE_URL}/transactions/${id}`, formData);

        return data;
    } catch (error) {
        console.log(error);
    }
}
const deleteTransaction = async (id) => {
    try {

        const { data } = await axios.delete(`${BASE_URL}/transactions/${id}`);

        return data;
    } catch (error) {
        console.log(error);
    }
}

export { getTransactions, createTransaction, singleTransaction, editTransaction, deleteTransaction };