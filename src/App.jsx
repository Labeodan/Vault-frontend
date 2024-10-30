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
      <Route path="/" element={<h2>Landing page</h2>} />
      <Route path="/auth/signin" element={<SignIn authService={authService} user={user} setUser={setUser} />} />
      <Route path="/auth/signup" element={<SignUp authService={authService} user={user} setUser={setUser} />} />

      {/* Transaction routes */}
      <Route path="/expenses" element={<SignIn authService={authService} user={user} setUser={setUser} />} />

    </Routes>
  </>);
};

export default App;
