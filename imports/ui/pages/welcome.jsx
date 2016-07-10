import React from 'react';
import { Link } from 'react-router';
import { Login } from '../components/login.jsx';

export const Welcome = () => (
  <div>
    <h2>Welcome Page</h2>
    <p>Plese, login:</p>
    <Login />
    <p>Or <Link to="create-account">Create Account</Link> </p> 
  </div>
);
