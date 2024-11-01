import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { editTransaction, singleTransaction, getAllCategories } from '../../../services/backendConnection';
import { CategoriesSelect } from '../CategoriesList/CategoriesList';

export const TransactionEdit = (user) => {

    const params = useParams();
    const transactionID = params.transactionId;

    const [categories, setCategories] = useState([]);
    const [transactionData, setTransactionData] = useState({
        name: '',
        type: "Expense",
        amount: "",
        category: "",
        //owner: user.user._id
    });

    const handleChange = (evt) => {
        console.log("evt.target", evt);
        console.log(transactionData);
        setTransactionData({ ...transactionData, [evt.target.name]: evt.target.value });
    };

    const handleSubmitForm = async (evt) => {
        evt.preventDefault();
        console.log("transaction data", transactionData);
        setTransactionData({ ...transactionData, owner: user.user._id });
        const newTransaction = await editTransaction(transactionID, transactionData);
        console.log(newTransaction);

        //update values in form after the update
        const fetchTransaction = async () => {

            const expense = await singleTransaction(transactionID);//call get single transaction by id
 
            console.log(expense);
            setTransactionData({
                name: expense.name,
                type: expense.type,
                amount: expense.amount,
                category: expense.category,
            })
        };
        // invoke the function
        fetchTransaction();
    };

    useEffect(() => {
        // create a new async function
        const fetchTransaction = async () => {

            const expense = await singleTransaction(transactionID);//call get single transaction by id
            console.log(expense);
            setTransactionData({
                name: expense.name,
                type: expense.type,
                amount: expense.amount,
                category: expense.category,
            })
        };
        const fetchCategories = async () => {
            const categories = await getAllCategories();//call get single transaction by id
            setCategories(categories)
        };

        // invoke the functions
        fetchTransaction();
        fetchCategories();

    }, []);

    return (
        <main  >
            <form onSubmit={handleSubmitForm}>
                <h1 /* className={styles.heading} */>Edit transaction</h1>
                <div /* className={styles.fields} */>
                    <div>
                        <label htmlFor="name"> Name</label>
                        <input
                            id="name"
                            name="name"
                            value={transactionData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="amount"> Amount</label>
                        <input
                            type='number'
                            id="amount"
                            name="amount"
                            value={transactionData.amount}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>

                        <label  > Type:  </label>
                        <input type="radio" id="Expense" name="type" value="Expense" onChange={handleChange} checked={transactionData.type == "Expense" ? 'checked' : ""} />
                        <label htmlFor="Expense">Expense</label>
                        <input type="radio" id="Income" name="type" value="Income" onChange={handleChange} checked={transactionData.type == "Expense" ? '' : "checked"} />
                        <label htmlFor="Income">Income</label>

                    </div>

                    <div>
                        <label>
                            Category:
                            <CategoriesSelect handleChange={handleChange} formData={transactionData} categories={categories} selected={transactionData.category.name}></CategoriesSelect>
                        </label>
                    </div>
                </div>

                <button type="submit">Edit</button>
            </form>
        </main>
    )
}