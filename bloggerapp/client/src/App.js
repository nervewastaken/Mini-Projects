import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import LoginPage from './routes/LoginPage';


function App() {
  // State to manage authentication status
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState('');

  // Function to handle form submission (login)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const password = formData.get('password');

    try {
      const response = await fetch('http://localhost:4000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
      });
      console.log(name,password)
      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      setAuthenticated(true);
      window.location.href("/HomePage")
    } catch (err) {
      console.error(err);
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      <LoginPage/>
    </div>
  );
}

export default App;
