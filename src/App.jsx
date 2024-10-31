// packages import
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

//services
import * as financeService from './services/backendConnection';
import * as authService from './services/authService';
import { getUser } from './utils/auth';

//components
import { SignUp } from './pages/SignUp/SignUp';
import { SignIn } from './pages/SignIn/SignIn';
import { Header } from './components/Header/Header';
import { TransactionList } from './components/transactions/TransactionList/TransactionList';
import { TransactionForm } from './components/transactions/TransactionForm/TransactionForm';
import { TransactionEdit } from './components/transactions/TransactionEdit/TransactionEdit';
import BudgetCreate from './pages/BudgetCreate/BudgetCreate';
import BudgetUpdate from './pages/BudgetUpdate/BudgetUpdate';
import Dashboard from './pages/Dashboard/Dashboard';
import LandingPage from './pages/LandingPage/LandingPage';

const App = () => {
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
    <Header user={user} setUser={setUser}></Header>
    <Routes>
      {/* User routes */}
      {/* <Route path='/auth/signout' element={<SignOutElement setUser={setUser} />} /> */}
      <Route path="/" element={<LandingPage  user={user}/>} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/auth/signin" element={<SignIn authService={authService} user={user} setUser={setUser} />} />
      <Route path="/auth/signup" element={<SignUp authService={authService} user={user} setUser={setUser} />} />

      {/* Transaction routes */}
      <Route path="/expenses" element={<TransactionList user={user} />} />
      <Route path="/expenses/new" element={<TransactionForm user={user} />} />
      <Route path="/expenses/:transactionId/edit" element={<TransactionEdit user={user} />} />

      {/* Budget Routes */}
      <Route path="/budget/new" element={<BudgetCreate />} />
      <Route path="/budget/:budgetId" element={<BudgetUpdate />} />
    </Routes>
  </>);
};

export default App;
