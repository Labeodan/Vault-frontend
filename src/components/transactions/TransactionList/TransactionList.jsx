import { useState, useEffect } from 'react';
import * as financeService from '../../../services/backendConnection';
import { Transaction } from '../Transaction/Transaction';
import styles from "./TransactionList.module.scss";


export const TransactionList = (user) => {
    const [transactions, setTransactions] = useState([]);
    useEffect(() => {
        // create a new async function
        const fetchExpenses = async () => {
            const expenses = await financeService.getTransactions(user);//call the transactions list
            setTransactions(expenses.transactions);
        };
        // invoke the function
        fetchExpenses();
    }, []);

    const deleteTransaction = async (id) => {
        //add alert for confirmation?
        await financeService.deleteTransaction(id);

        //update list after delete
        const expenses = await financeService.getTransactions(user);
        setTransactions(expenses.transactions);
    }

    return (
        <div className={styles.listDiv}>
            <h2>Transaction List:</h2>
            <ul>
                {transactions.map((transaction, index) => {
                    //return (<Transaction transaction={transaction}></Transaction>)
                      return (<li><Transaction key={index} transaction={transaction} deleteTransaction={deleteTransaction} /></li>)
 
                })}
            </ul>
        </div>
    )
}