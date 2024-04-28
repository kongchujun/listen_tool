import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
interface Props {
  onLoginSuccess: (token: string) => void;
}

export const Login: React.FC<Props> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
    const navigate = useNavigate();
   const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
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
           navigate('/');
        } catch (error) {
          console.error('Token validation error:', error);
          localStorage.removeItem('token');
          setToken(null);
        }
      }
    };

    verifyToken();
  }, [token]);
  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/token',
          new URLSearchParams({
          username,
          password
}), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      onLoginSuccess(response.data.access_token);
    navigate('/');  // 导航到主页
        console.log("go to main page")
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.detail);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <div className="login-container">
         <div className="login-form">
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
    </div>
  );
};
