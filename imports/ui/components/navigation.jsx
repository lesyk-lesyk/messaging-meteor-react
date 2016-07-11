import React, { Component, PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';

import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';

import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';

const handleLogout = () => Meteor.logout(() => browserHistory.push('/welcome'));

const userName = () => {
  const user = Meteor.user();
  const name = user && user.profile ? user.profile.firstname : '';
  return name;
};

export class Navigation extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Messaging</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <IndexLinkContainer to="/">
              <NavItem eventKey={ 1 } href="/">Chat</NavItem>
            </IndexLinkContainer>
            <LinkContainer to="/settings">
              <NavItem eventKey={ 2 } href="/settings">Settings</NavItem>
            </LinkContainer>
          </Nav>
          <Nav pullRight>
            <NavDropdown eventKey={ 3 } title={ userName() } id="basic-nav-dropdown">
              <MenuItem eventKey={ 3.1 } href="/settings">Settings</MenuItem>
              <MenuItem eventKey={ 3.2 } onClick={ handleLogout }>Logout</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}


