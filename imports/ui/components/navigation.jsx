import React, { Component, PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';

import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';

const handleLogout = () => Meteor.logout(() => browserHistory.push('/welcome'));

const userName = () => {
  const user = Meteor.user();
  const name = user && user.profile ? user.profile.firstname : '';
  return name;
};

export class Navigation extends Component {
  render() {
    return (
      <div>
        <p>Hello, { userName() } </p>
        <ul>
          <li><IndexLink to="/" activeClassName="active">Messaging</IndexLink></li>
          <li><Link to="/settings" activeClassName="active">Settings</Link></li>
          <li><Link to="" onClick={ handleLogout } >LogOut</Link></li>
        </ul>
      </div>
    );
  }
}
