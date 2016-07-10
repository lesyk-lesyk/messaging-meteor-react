import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';


export class Login extends Component {
  handleSubmit(event) {
    event.preventDefault();

    var email = this.refs.email.value.trim();
    var password = this.refs.password.value.trim();
    
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
          <input type="text" ref="email" placeholder="Email..."/>
          <input type="password" ref="password" placeholder="Password..."/>
          <input type="submit" value="Login"/>
        </form>
      </div>
    );
  }
}
