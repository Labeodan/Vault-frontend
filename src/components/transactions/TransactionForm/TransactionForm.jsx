import { useState, useEffect } from 'react';
import { createTransaction, getAllCategories } from '../../../services/backendConnection';
import { CategoriesSelect } from '../CategoriesList/CategoriesList';
export const TransactionForm = (user) => {

    const [categories, setCategories] = useState([]);
    const [transactionData, setTransactionData] = useState({
        name: '',
        type: "Expense",
        amount: "",
        category: "Health",//currently sets transport category by default 
        //owner: user.user._id
    });

    const handleChange = (evt) => {
        console.log("evt.target", evt.target);
        setTransactionData({ ...transactionData, [evt.target.name]: evt.target.value });
    };
    const handleSubmitForm = async (evt) => {
        evt.preventDefault();
        setTransactionData({ ...transactionData, owner: user.user._id });
        const newTransaction = await createTransaction(transactionData);
        console.log(newTransaction);
    };

    useEffect(() => {
        // create a new async function
        const fetchCategories = async () => {

            const fetchedCat = await getAllCategories();
            console.log("categories fetched",fetchedCat);
            setCategories(fetchedCat)
        };
        // invoke the function
        fetchCategories();
    }, []);

    return (
        <main  >
            <form onSubmit={handleSubmitForm}>
                <h1 /* className={styles.heading} */>Add transaction</h1>
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
                        <input type="radio" id="Expense" name="type" onChange={handleChange} value="Expense" />
                        <label htmlFor="Expense">Expense</label>
                        <input type="radio" id="Income" name="type" onChange={handleChange} value="Income" />
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
    )
}