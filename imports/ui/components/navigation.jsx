import React from 'react';
import { IndexLink, Link } from 'react-router';

export const Navigation = () => (
  <ul>
    <li><IndexLink to="/" activeClassName="active">Messaging</IndexLink></li>
    <li><Link to="/settings" activeClassName="active">User Settings</Link></li>
    <li><Link to="" activeClassName="active">LogOut</Link></li>
  </ul>
)
