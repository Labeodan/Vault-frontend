import { Link } from "react-router-dom";

export const Transaction = ({ transaction, deleteTransaction }) => {

    return (
        <div>
            <p><b> {transaction.name}</b> {transaction.amount}€</p>
            <p>Type: {transaction.type}</p>
            <p>Category: {transaction.category.name} </p>
            <p><Link to={`/expenses/${transaction._id}/edit`}>Edit</Link></p>
            <button onClick={() => { deleteTransaction(transaction._id) }}> Delete </button>
        </div>
    );
}