import { Link } from "react-router-dom";
import styles from "./Transaction.module.scss";

export const Transaction = ({ transaction, deleteTransaction }) => {
 
    return (
        <div>
            <p><b> {transaction.name}</b> <span className={transaction.type == "Expense"?styles.expense:styles.income} >${transaction.amount} </span> </p>
            <p>Type: {transaction.type}</p>
            <p>Category: {transaction.category.name} </p>
            <p><Link to={`/expenses/${transaction._id}/edit`}>Edit</Link></p>
            <button onClick={() => { deleteTransaction(transaction._id) }}> Delete </button>
        </div>
    );
 
}