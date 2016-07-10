import React from 'react';
import { RegisterContainer } from '../components/register.jsx';
import { Link } from 'react-router';

export const CreateAccount = () => (
  <div>
    <p>Create New Account or <Link to="welcome">Login</Link></p>
    <RegisterContainer />
  </div>
);
