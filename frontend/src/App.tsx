import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './Login';
import HomePage from './HomePage';

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const handleLoginSuccess = (token: string) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        try {
          const response = await axios.get('/api/verify-token', {
            headers: { Authorization: `Bearer ${token}` }
          });
          console.log(response.data)
          if (response.data.valid !== true) {
            throw new Error('Token invalid');
          }
        } catch (error) {
          console.error('Token validation error:', error);
          localStorage.removeItem('token');
          setToken(null);
        }
      }
    };

    verifyToken();
  }, [token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="*" element={<Navigate to={token ? "/" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
