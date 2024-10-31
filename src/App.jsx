// packages import
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

//services
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
import CategoryTransactions from './pages/CategoryTransactions/CategoryTransactions';
import NotFound from './pages/NotFound/NotFound';

const App = () => {
  const [user, setUser] = useState(getUser());


  return (<>
    <Header user={user} setUser={setUser}></Header>
    <Routes>

      <Route path="/" element={<LandingPage  user={user}/>} />
      {user 
      ? (
        <>

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard user={user}/>} />
          {/* Transaction routes */}
          <Route path="/expenses" element={<TransactionList user={user} />} />
          <Route path="/expenses/new" element={<TransactionForm user={user} />} />
          <Route path="/expenses/:transactionId/edit" element={<TransactionEdit user={user} />} />
          {/* Budget Routes */}
          <Route path="/budget/new" element={<BudgetCreate />} />
          <Route path="/budget/edit/:budgetId" element={<BudgetUpdate />} />
          {/* categories */}
          <Route path="/category/:categoryName" element={<CategoryTransactions />} />
        </>
      )

      : (
        <>
      {/* User routes */}
      <Route path="/auth/signin" element={<SignIn authService={authService} user={user} setUser={setUser} />} />
      <Route path="/auth/signup" element={<SignUp authService={authService} user={user} setUser={setUser} />} />
        </>
      )
      
      }

      <Route path="*" element={<NotFound />} />
    </Routes>
  </>);
};

export default App;
