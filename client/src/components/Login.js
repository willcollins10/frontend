import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from './AuthContext';

const Login = ({onClose}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // This is how we access the login directly from the context we created in AuthContext
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/login', { email, password });
      login(response.data.user);
      console.log("response data", response.data);
      console.log("Response data for user", response.data.user);
      console.log("email of logged in user", email)
      console.log("password of logged in user", password)
      navigate('/');
    } catch (error) {
      console.error('Error logging in', error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <button type="button" className="close-button" onClick={onClose}>x</button>
        <h2>Login</h2>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
