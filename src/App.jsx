// packages import
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

//services
import * as financeService from './services/backendConnection';
import * as authService from './services/authService';
import { getUser, removeToken } from './utils/auth';

//components
import { SignUpForm } from './components/SignUpForm/signUpForm';
import { SignInForm } from './components/auth/SignInFrom/signInForm';
import { SignOutElement } from './components/SignOutComponent/signOutComponent';
import { Header } from './components/Header/Header';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [tags, setTags] = useState([]);
  const [user, setUser] = useState(getUser);

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
    <h2>Current user: {(user ? user.username : "none")}</h2>
    <Header user={user} setUser={setUser}></Header>
    <Routes>
      {/* User routes */}
      <Route path='/auth/signout' element={<SignOutElement setUser={setUser} />} />
      <Route path="/" element={<h2>Landing page</h2>} />
      <Route path="/auth/signin" element={<SignInForm authService={authService} user={user} setUser={setUser} />} />
      <Route path="/auth/signup" element={<SignUpForm authService={authService} user={user} setUser={setUser} />} />

      {/* Transaction routes */}
      <Route path="/expenses" element={<SignInForm authService={authService} user={user} setUser={setUser} />} />

    </Routes>
  </>);
};

export default App;
