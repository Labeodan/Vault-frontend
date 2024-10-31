import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Dashboard.module.scss';
import * as financeService from '../../services/backendConnection';
import * as budgetService from '../../services/budgets';
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend);

const Dashboard = ({ user }) => {
    const [transactions, setTransactions] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [categories, setCategories] = useState({});
    const [budgets, setBudgets] = useState([]);  // New state for budgets

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

        const fetchBudgets = async () => {
            const response = await budgetService.getBudgets();
            setBudgets(response.data.budgets);  // Assuming the API response has this structure
        };

        fetchExpenses();
        fetchBudgets();  // Fetch budgets when component loads
    }, [user]);


    const calculateBudgetProgress = (budget) => {
        const spent = transactions
            .filter(t => t.category.name === budget.category.name && t.type === 'Expense')
            .reduce((sum, t) => sum + t.amount, 0);
        return (spent / budget.target) * 100;
    };

    const getExpenseStatusData = () => {
        const expenseCategories = {};

        transactions
            .filter(transaction => transaction.type === 'Expense')
            .forEach(transaction => {
                const categoryName = transaction.category.name;
                expenseCategories[categoryName] = (expenseCategories[categoryName] || 0) + transaction.amount;
            });

        const labels = Object.keys(expenseCategories);
        const data = Object.values(expenseCategories);

        return {
            labels,
            datasets: [{
                label: 'Expense Status',
                data,
                backgroundColor: labels.map((_, index) => `hsl(${(index * 360) / labels.length}, 70%, 70%)`),
            }],
        };
    };

    const getIncomeStatusData = () => {
        const incomeCategories = {};

        transactions
            .filter(transaction => transaction.type === 'Income')
            .forEach(transaction => {
                const categoryName = transaction.category.name;
                incomeCategories[categoryName] = (incomeCategories[categoryName] || 0) + transaction.amount;
            });

        const labels = Object.keys(incomeCategories);
        const data = Object.values(incomeCategories);

        return {
            labels,
            datasets: [{
                label: 'Income Status',
                data,
                backgroundColor: labels.map((_, index) => `hsl(${(index * 360) / labels.length}, 70%, 70%)`),
            }],
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

                {/* Budgets Section with Progress */}
                <section className={styles.budgets}>
                <h3>Budgets</h3>
                <div className={styles.budgetGrid}>
                    {budgets.map(budget => {
                        const progress = calculateBudgetProgress(budget);
                        return (
                            <div key={budget._id} className={styles.budgetCard}>
                                <h4>{budget.name}</h4>
                                <p>Target: ${budget.target.toFixed(2)}</p>
                                <p>Remaining: ${(budget.target - progress).toFixed(2)}</p>
                                <p>Category: {budget.category.name}</p>
                                
                                {/* Progress bar */}
                                <div className={styles.progressContainer}>
                                    <div className={styles.progressBar} style={{ width: `${progress}%`, backgroundColor: progress > 100 ? 'red' : '#4caf50' }} />
                                </div>
                                <p>{progress.toFixed(1)}% Used</p>

                                <Link to={`/budget/edit/${budget._id}`} className={styles.button}>Edit</Link>
                                <button 
                                    className={styles.button} 
                                    onClick={async () => {
                                        try {
                                            // Delete the budget on the server
                                            await budgetService.deleteBudget(budget._id);

                                            // Update the state by removing the deleted budget
                                            setBudgets(prevBudgets => prevBudgets.filter(b => b._id !== budget._id));
                                        } catch (error) {
                                            console.error("Failed to delete the budget:", error);
                                            // Optional: Add error handling logic here (e.g., showing an alert to the user)
                                        }
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        );
                    })}
                </div>
                <button>
                <Link to="/budget/new" className={styles.button}>New Budget</Link>

                </button>
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
                        <Link key={category} to={`/category/${encodeURIComponent(category)}`} className={styles.categoryCardLink}>
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
