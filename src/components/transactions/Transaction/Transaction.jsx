import { Link } from "react-router-dom";

export const Transaction = ({ transaction, deleteTransaction }) => {

    return (<div>
        <p><b> {transaction.name}</b> {transaction.amount}€</p>
        <p>Categories: </p>
        <p><Link to={`/expenses/${transaction._id}/edit`}>Edit</Link></p>
        <span onClick={() => { deleteTransaction(transaction._id) }}> Delete </span>
    </div>);
}