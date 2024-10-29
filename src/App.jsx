// packages import
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

//services
import * as financeService from './services/backendConnection';
import * as authService from './services/authService';
import { getUser, removeToken } from './utils/auth';

//components
import { SignUpForm } from './components/auth/signUpForm';
import { SignInForm } from './components/auth/signInForm';
import { SignOutElement } from './components/auth/signOutComponent';
const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [tags, setTags] = useState([]);
  const [user, setUser] = useState(getUser);

  console.log(user);

  useEffect(() => {
    // create a new async function
    const fetchPets = async () => {
      // call on the index function
      const pets = await financeService.index();
      // Set petList state to the returned pets data
    };
    // invoke the function

  }, []);

  return (<>
    <h2>Current user: {(user ? user.username : "none")}</h2>

    <Routes>
      <Route path='/auth/signout' element={<SignOutElement setUser={setUser} />} />
      <Route path="/" element={<h2>Landing page</h2>} />
      <Route path="/auth/signin" element={<SignInForm authService={authService} user={user} setUser={setUser} />} />
      <Route path="/auth/signup" element={<SignUpForm authService={authService} user={user} setUser={setUser} />} />
    </Routes>
  </>);
};

export default App;
