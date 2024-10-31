import styles from './Dashboard.module.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as financeService from '../../services/backendConnection';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Tooltip,
    Legend
);

const Dashboard = ({ user }) => {
    const [transactions, setTransactions] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [categories, setCategories] = useState({});

    useEffect(() => {
        const fetchExpenses = async () => {
            const data = await financeService.getTransactions(user);
            setTransactions(data.transactions);

            let income = 0;
            let expensesSum = 0;
            const categoryTotals = {};

            data.transactions.forEach(transaction => {
                if (transaction.type === 'Income') {
                    income += transaction.amount;
                } else {
                    expensesSum += transaction.amount;
                }

                const categoryName = transaction.category.name;
                if (!categoryTotals[categoryName]) {
                    categoryTotals[categoryName] = transaction.amount;
                } else {
                    categoryTotals[categoryName] += transaction.amount;
                }
            });

            setTotalIncome(income);
            setTotalExpenses(expensesSum);
            setCategories(categoryTotals);
        };

        fetchExpenses();
    }, [user]);

    const getExpenseStatusData = () => {
        const incomeCategories = {};
    
        // Filter transactions to only include 'Expense' type and categorize them
        transactions
            .filter(transaction => transaction.type === 'Expense')
            .forEach(transaction => {
                const categoryName = transaction.category.name;
                if (!incomeCategories[categoryName]) {
                    incomeCategories[categoryName] = transaction.amount;
                } else {
                    incomeCategories[categoryName] += transaction.amount;
                }
            });
    
        const labels = Object.keys(incomeCategories);
        const data = Object.values(incomeCategories);
    
        return {
            labels,
            datasets: [
                {
                    label: 'Expense Status',
                    data,
                    backgroundColor: labels.map((_, index) =>
                        `hsl(${(index * 360) / labels.length}, 70%, 70%)`
                    ),
                },
            ],
        };
    };

    const getIncomeStatusData = () => {
        const incomeCategories = {};
    
        // Filter transactions to only include 'Income' type and categorize them
        transactions
            .filter(transaction => transaction.type === 'Income')
            .forEach(transaction => {
                const categoryName = transaction.category.name;
                if (!incomeCategories[categoryName]) {
                    incomeCategories[categoryName] = transaction.amount;
                } else {
                    incomeCategories[categoryName] += transaction.amount;
                }
            });
    
        const labels = Object.keys(incomeCategories);
        const data = Object.values(incomeCategories);
    
        return {
            labels,
            datasets: [
                {
                    label: 'Income Status',
                    data,
                    backgroundColor: labels.map((_, index) =>
                        `hsl(${(index * 360) / labels.length}, 70%, 70%)`
                    ),
                },
            ],
        };
    };
    

    return (
        <main className={styles.dashboard}>
            <header className={styles.header}>
                <h1>Financial Overview</h1>
            </header>

            <section className={styles.summary}>
                <div className={styles.summaryCard}>
                    <h2>Total Expenses</h2>
                    <p className={styles.amount}>${totalExpenses.toFixed(2)}</p>
                    <button className={styles.button}>New Expense</button>
                </div>
                <div className={styles.summaryCard}>
                    <h2>Total Income</h2>
                    <p className={styles.amount}>${totalIncome.toFixed(2)}</p>
                    <button className={styles.button}>Add Income</button>
                </div>
            </section>

            <section className={styles.charts}>
                <div className={styles.chart}>
                    <h3>Total Revenue</h3>
                    <Pie data={getExpenseStatusData()} />
                </div>
                <div className={styles.chart}>
                    <h3>Income Status</h3>
                    <Pie data={getIncomeStatusData()} />
                </div>
            </section>

            <section className={styles.transactionCategories}>
                <h3>Transaction Categories</h3>
                <div className={styles.categoryGrid}>
                    {Object.entries(categories).map(([category, amount]) => (
                       <Link 
                       key={category} 
                       to={`/category/${encodeURIComponent(category)}`} 
                       className={styles.categoryCardLink}
                   >
                       <div className={styles.categoryCard}>
                           <h4>{category}</h4>
                           <p className={styles.amount}>${amount.toFixed(2)}</p>
                       </div>
                   </Link>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Dashboard;
