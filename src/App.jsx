// packages import
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

//services
import * as financeService from './services/backendConnection';
import * as authService from './services/authService';
import { getUser, removeToken } from './utils/auth';

//components
import { SignUp } from './pages/SignUp/SignUp';
import { SignIn } from './pages/SignIn/SignIn';
// import { SignOutElement } from './pages/SignOutComponent/signOutComponent';
import { Header } from './components/Header/Header';
import { TransactionList } from './components/transactions/TransactionList/TransactionList';
import { TransactionForm } from './components/transactions/TransactionForm/TransactionForm';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [tags, setTags] = useState([]);
  const [user, setUser] = useState(getUser());

  useEffect(() => {
    // create a new async function
    const fetchExpenses = async () => {
      // call on the index function
      const expenses = await financeService.index();
      // Set petList state to the returned pets data
    };
    // invoke the function

  }, []);

  return (<>
    <h2>Current user: {(user ? user.username : "")}</h2>
    <Header user={user} setUser={setUser}></Header>
    <Routes>
      {/* User routes */}
      {/* <Route path='/auth/signout' element={<SignOutElement setUser={setUser} />} /> */}
      <Route path="/" element={<h2>Landing page</h2>} />
      <Route path="/auth/signin" element={<SignIn authService={authService} user={user} setUser={setUser} />} />
      <Route path="/auth/signup" element={<SignUp authService={authService} user={user} setUser={setUser} />} />

      {/* Transaction routes */}
      <Route path="/expenses" element={<TransactionList user={user} />} />
      <Route path="/expenses/new" element={<TransactionForm user={user}/>} />
      <Route path="/expenses/new" element={<TransactionForm user={user}/>} />
    </Routes>
  </>);
};

export default App;
