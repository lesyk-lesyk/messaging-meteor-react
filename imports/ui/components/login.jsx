import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import { Link } from 'react-router';

import { getInputValue } from '../../modules/get-input-value';
import { Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

export class Login extends Component {
  handleSubmit(event) {
    event.preventDefault();
    
    var email = getInputValue(this.refs.email).trim();
    var password = getInputValue(this.refs.password).trim();
    
    Meteor.loginWithPassword(email, password, function(err) {
      if(err) {
        if (err.reason) {
          alert(err.reason);
          console.log(err);
        }
      } else {
        browserHistory.push('/');
      }
    });
  }

  render() {
    return (
        <div>
          <form onSubmit={this.handleSubmit.bind(this)}>
             <FormGroup>
              <ControlLabel>Email Address</ControlLabel>
              <FormControl
                type="email"
                ref="email"
                name="email"
                placeholder="Email Address"
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>
                <span className="pull-left">Password</span>
              </ControlLabel>
              <FormControl
                type="password"
                ref="password"
                name="password"
                placeholder="Password"
              />
            </FormGroup>
            <Button type="submit" bsStyle="success">Login</Button>
          </form>
        </div>
    );
  }
}
