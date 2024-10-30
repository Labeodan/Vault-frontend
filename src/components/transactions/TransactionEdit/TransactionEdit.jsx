import { useState, useEffect } from 'react';
import { editTransaction,singleTransaction } from '../../../services/backendConnection';
export const TransactionEdit = (user) => {

    const [transactionData, setTransactionData] = useState({
        name: '',
        type: "",
        amount: "",
        category:"",//currently sets transport category by default 
        //owner: user.user._id
    });

    const handleChange = (evt) => {
        console.log(transactionData);
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
        const fetchExpenses = async () => {
            const expense = await financeService.singleTransaction(id);//call the transactions list
            console.log(expense);
            setTransactions(...[expense]);
        };
        // invoke the function
        fetchExpenses();
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
                        <input type="radio" id="Expense" name="type" value="Expense" />
                        <label htmlFor="Expense">Expense</label>
                        <input type="radio" id="Income" name="type" value="Income" />
                        <label htmlFor="Income">Income</label>

                    </div>
                    <div>
                        <label htmlFor="amount"> Category: to be implemented </label>

                    </div>

                </div>


                <button type="submit">Create</button>
            </form>
        </main>
    )
}