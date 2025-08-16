import './App.css';
import Login from './login';
import Navigacija from './Navigacija';
import React, { useState } from 'react';
import {BrowserRouter, Routes, Route } from 'react-router';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = (token) => {
    if (!token) {
      setLoginError('Greška prilikom prijave. Molimo pokušajte ponovo.');
      console.error('No token provided');
      return;
    }
    setLoggedIn(true);
    setToken(token);
    setLoginError('');
  }


  return (
    <BrowserRouter>
      <Navigacija loggedIn={loggedIn}></Navigacija>
      <Routes>
        <Route path="/" element={<h1>Početna stranica</h1>} />
        <Route path="/login" element={<Login onLogin={handleLogin} loginError={loginError} />} />
      </Routes>
    
      
    </BrowserRouter>
  );
}

export default App;
