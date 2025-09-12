import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from './store/authSlice';
import { Toaster } from 'react-hot-toast';

import MovieCard from './components/MovieCard';
import SearchBar from './components/SearchBar';
import Navbar from './components/Navbar';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authUser, isCheckingAuth } = useSelector((state) => state.auth);
  

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isCheckingAuth) return <p className="text-center mt-5">Loading...</p>;

  return (
    <>
      <Routes>
        <Route path='/' element={!authUser ? <SignUp /> : <Home />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
