import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

export class Register extends Component {
  handleSubmit(event) {
    event.preventDefault();

    var email = this.refs.email.value.trim();
    var password = this.refs.password.value.trim();
    var firstname = this.refs.firstname.value.trim();
    var lastname = this.refs.lastname.value.trim();

    var user = {
      'email': email,
      password: password,
      profile: {
        firstname: firstname,
        lastname: lastname,
      }
    };

    Accounts.createUser(user, function(err){
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
          <input type="text" ref="firstname" placeholder="First name..."/>
          <input type="text" ref="lastname" placeholder="Last name..."/>
          <input type="text" ref="email" placeholder="Email..."/>
          <input type="password" ref="password" placeholder="Password..."/>
          <input type="submit" value="Register"/>
        </form>
      </div>
    );
  }
}
