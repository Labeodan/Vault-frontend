import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { editTransaction, singleTransaction } from '../../../services/backendConnection';

export const TransactionEdit = ({ user }) => {
    const params = useParams();
    const transactionID = params.transactionId;
    const navigate = useNavigate();

    const [transactionData, setTransactionData] = useState({
        name: '',
        type: "Expense",
        amount: "",
        category: "Transport", // Sets "Transport" as default category
    });

    const [error, setError] = useState(null);

    const handleChange = (evt) => {
        setTransactionData({ ...transactionData, [evt.target.name]: evt.target.value });
    };

    const handleSubmitForm = async (evt) => {
        evt.preventDefault();
        setError(null); // Reset error before submission

        const updatedTransaction = await editTransaction(transactionID, {
            ...transactionData,
            owner: user._id,
        });

        // Check if the update request returned an error
        if (updatedTransaction && updatedTransaction.status >= 400) {
            setError(updatedTransaction.data.error || "Failed to update transaction.");
        } else {
            navigate(`/category/${transactionData.category}`); // Only navigate if no error occurs
        }
    };

    useEffect(() => {
        // Fetch the transaction data by ID and update the form fields
        const fetchTransaction = async () => {
            const expense = await singleTransaction(transactionID);
            if (expense && expense.status >= 400) {
                setError(expense.data.error || "Failed to fetch transaction.");
            } else {
                setTransactionData({
                    name: expense.name,
                    type: expense.type,
                    amount: expense.amount,
                    category: expense.category || "Transport",
                });
            }
        };
        fetchTransaction();
    }, [transactionID]);

    return (
        <main>
            <form onSubmit={handleSubmitForm}>
                <h1>Edit Transaction</h1>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <div>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            name="name"
                            value={transactionData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="amount">Amount</label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            value={transactionData.amount}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Type:</label>
                        <input
                            type="radio"
                            id="Expense"
                            name="type"
                            value="Expense"
                            onChange={handleChange}
                            checked={transactionData.type === "Expense"}
                        />
                        <label htmlFor="Expense">Expense</label>
                        <input
                            type="radio"
                            id="Income"
                            name="type"
                            value="Income"
                            onChange={handleChange}
                            checked={transactionData.type === "Income"}
                        />
                        <label htmlFor="Income">Income</label>
                    </div>
                    <div>
                        <label htmlFor="category">Category:</label>
                        <select
                            name="category"
                            id="category"
                            value={transactionData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="Food">Food</option>
                            <option value="Salary">Salary</option>
                            <option value="Utilities">Utilities</option>
                            <option value="Gift">Gift</option>
                            <option value="Health">Health</option>
                            <option value="Transport">Transport</option>
                            <option value="None">None</option>
                        </select>
                    </div>
                </div>
                <button type="submit">Edit</button>
            </form>
        </main>
    );
};
