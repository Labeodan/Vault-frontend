import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { editTransaction, singleTransaction } from '../../../services/backendConnection';
export const TransactionEdit = (user) => {
    const params = useParams();
    const transactionID = params.transactionId;

    const [transactionData, setTransactionData] = useState({
        name: '',
        type: "Expense",
        amount: "",
        category: "Transport",//currently sets transport category by default 
        //owner: user.user._id
    });

    const handleChange = (evt) => {
        console.log(transactionData);
        setTransactionData({ ...transactionData, [evt.target.name]: evt.target.value });
    };
    const handleSubmitForm = async (evt) => {
        evt.preventDefault();
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
                category: 'Transport',
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
                category: 'Transport',
            })
        };
        // invoke the function
        fetchTransaction();
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
                        <label htmlFor="amount"> Category: to be implemented </label>

                    </div>
                </div>
                <button type="submit">Edit</button>
            </form>
        </main>
    )
}