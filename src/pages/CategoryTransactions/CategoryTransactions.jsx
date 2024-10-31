import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as financeService from "../../services/backendConnection";
import styles from "./CategoryTransactions.module.scss";

const CategoryTransactions = () => {
    const { categoryName } = useParams(); // Get the category name from the route
    const [transactions, setTransactions] = useState([]);
    const [incomeTransactions, setIncomeTransactions] = useState([]);
    const [expenseTransactions, setExpenseTransactions] = useState([]);

    useEffect(() => {
        const fetchCategoryTransactions = async () => {
            const allTransactions = await financeService.getTransactions();
            const filteredTransactions = allTransactions.transactions.filter(
                transaction => transaction.category.name === categoryName
            );
            setTransactions(filteredTransactions);
        };

        fetchCategoryTransactions();
    }, [categoryName]);

    useEffect(() => {
        const incomes = transactions.filter(transaction => transaction.type === "Income");
        const expenses = transactions.filter(transaction => transaction.type === "Expense");
        
        setIncomeTransactions(incomes);
        setExpenseTransactions(expenses);
    }, [transactions]);

    return (
        <div className={styles.categoryTransactions}>
            <h2>Transactions in {categoryName}</h2>

            <section className={styles.transactionGroup}>
                <h3>Income Transactions</h3>
                <ul>
                    {incomeTransactions.length > 0 ? (
                        incomeTransactions.map(transaction => (
                            <li key={transaction._id}>
                                <h4>{transaction.name}</h4>
                                <p>Amount: ${transaction.amount.toFixed(2)}</p>
                            </li>
                        ))
                    ) : (
                        <p>No income transactions found.</p>
                    )}
                </ul>
            </section>

            <section className={styles.transactionGroup}>
                <h3>Expense Transactions</h3>
                <ul>
                    {expenseTransactions.length > 0 ? (
                        expenseTransactions.map(transaction => (
                            <li key={transaction._id}>
                                <h4>{transaction.name}</h4>
                                <p>Amount: ${transaction.amount.toFixed(2)}</p>
                            </li>
                        ))
                    ) : (
                        <p>No expense transactions found.</p>
                    )}
                </ul>
            </section>
        </div>
    );
};

export default CategoryTransactions;
