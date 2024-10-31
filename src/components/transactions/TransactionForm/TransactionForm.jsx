import { useState } from 'react';
import { createTransaction } from '../../../services/backendConnection';
import { useNavigate } from 'react-router';

export const TransactionForm = ({ user }) => {
    const [transactionData, setTransactionData] = useState({
        name: '',
        type: 'Expense',
        amount: '',
        category: 'Health', // Sets Health category by default 
    });

    const [error, setError] = useState(null); // State to hold error message
    const navigate = useNavigate();

    const handleChange = (evt) => {
        setTransactionData({ ...transactionData, [evt.target.name]: evt.target.value });
    };

    const handleSubmitForm = async (evt) => {
        evt.preventDefault();
        setError(null); // Reset error before new submission
    
        const newTransaction = await createTransaction({
            ...transactionData,
            owner: user._id, // Add owner directly to the transaction data
        });
    
        // Check if the transaction creation failed
        if (newTransaction && newTransaction.status >= 400) {
            setError(newTransaction.data.error || "Failed to create transaction.");
        } else {
            navigate("/dashboard"); // Only navigate if no error occurs
        }
    };
    

    return (
        <main>
            <form onSubmit={handleSubmitForm}>
                <h1>Add Transaction</h1>
                
                {/* Show error message if there's an error */}
                {error && <p style={{ color: 'red' }}>{error}</p>}

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
                            checked={transactionData.type === "Expense"}
                            onChange={handleChange}
                        />
                        <label htmlFor="Expense">Expense</label>
                        <input
                            type="radio"
                            id="Income"
                            name="type"
                            value="Income"
                            checked={transactionData.type === "Income"}
                            onChange={handleChange}
                        />
                        <label htmlFor="Income">Income</label>
                    </div>
                    <div>
                        <label htmlFor="category">Category:</label>
                        <select
                            required
                            name="category"
                            id="category-input"
                            value={transactionData.category}
                            onChange={handleChange}
                        >
                            <option value="Food">Food</option>
                            <option value="Salary">Salary</option>
                            <option value="Utilities">Utilities</option>
                            <option value="Gifts">Gifts</option>
                            <option value="Health">Health</option>
                            <option value="Transport">Transport</option>
                            {/* <option value="None">None</option> */}
                        </select>
                    </div>
                </div>

                <button type="submit">Create</button>
            </form>
        </main>
    );
};
