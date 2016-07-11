import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

import { createContainer } from 'meteor/react-meteor-data';
import { Locations } from '../../api/locations.js';

class Register extends Component {
  handleSubmit(event) {
    event.preventDefault();

    var email = this.refs.email.value.trim();
    var password = this.refs.password.value.trim();
    var firstname = this.refs.firstname.value.trim();
    var lastname = this.refs.lastname.value.trim();
    var location = this.refs.location.value.trim();

    var user = {
      email: email,
      password: password,
      profile: {
        firstname: firstname,
        lastname: lastname,
        location: location,
      }
    };

    Accounts.createUser(user, function(err){
      if(err) {
        if (err.reason) {
          alert(err.reason);
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
          <input type="text" ref="firstname" placeholder="First name..." required="required"/><br/>
          <input type="text" ref="lastname" placeholder="Last name..." required="required"/><br/>    
          <input type="text" ref="email" placeholder="Email..." required="required"/><br/> 
          <input type="password" ref="password" placeholder="Password..." required="required"/><br/><br/>

          <label htmlFor="location">Select your location.<br/><em>You can change it later...</em></label><br/>
          <select name="location" ref="location">
            { this.props.locations.map(function(location) {
              return <option key={location._id} value={location.name}>{location.name}</option>;
            })}
          </select><br/><br/>
          
          <input type="submit" value="Register"/>
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  locations: PropTypes.array.isRequired,
};

export const RegisterContainer = createContainer(() => {
  Meteor.subscribe('locations');
  
  return {
    locations: Locations.find({}, { sort : { name: 1 } }).fetch(),
  };
}, Register);
