import { useState, useEffect } from 'react';
import * as financeService from '../../../services/backendConnection';

export const TransactionList = (user) => {
    const [transactions, setTransactions] = useState([]);
    useEffect(() => {
        // create a new async function
        const fetchExpenses = async () => {
            const expenses = await financeService.getTransactions(user);//call the transactions list
            console.log(expenses);
            setTransactions(...[expenses]);
        };
        // invoke the function
        fetchExpenses();
    }, []);

    return (
        <div>
            <h2>Transaction List:</h2>
            <ul>
                {transactions.forEach(transaction => {
                    //return (<Transaction transaction={transaction}></Transaction>)
                    return (<li> {transaction.name} </li>)
                })}
            </ul>
        </div>
    )
}