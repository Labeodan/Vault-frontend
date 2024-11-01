import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { createTransaction, getAllCategories } from '../../../services/backendConnection';
import { CategoriesSelect } from '../CategoriesList/CategoriesList';
export const TransactionForm = (user) => {

    const [categories, setCategories] = useState([]);
    const [transactionData, setTransactionData] = useState({
        name: '',
        type: "Expense",
        amount: "",
        category: "Health",//currently sets Health category by default 

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


    useEffect(() => {
        // create a new async function
        const fetchCategories = async () => {

            const fetchedCat = await getAllCategories();
            console.log("categories fetched", fetchedCat);
            setCategories(fetchedCat)
        };
        // invoke the function
        fetchCategories();
    }, []);

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
                        <label>
                            Category:
                            <CategoriesSelect handleChange={handleChange} formData={transactionData} categories={categories} selected={null}></CategoriesSelect>
                        </label>


                    </div>
                </div>

                <button type="submit">Create</button>
            </form>
        </main>
    );
};
