import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

import { createContainer } from 'meteor/react-meteor-data';
import { Locations } from '../../api/locations.js';

import { getInputValue } from '../../modules/get-input-value';
import { Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

class Register extends Component {
  handleSubmit(event) {
    event.preventDefault();

    var email = getInputValue(this.refs.email).trim();
    var password = getInputValue(this.refs.password).trim();
    var firstname = getInputValue(this.refs.firstname).trim();
    var lastname = getInputValue(this.refs.lastname).trim();
    var location = getInputValue(this.refs.location).trim();

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

           <FormGroup>
            <FormControl
              type="text"
              ref="firstname"
              name="firstname"
              placeholder="First name"
              required="true"
            />
          </FormGroup>

           <FormGroup>
            <FormControl
              type="text"
              ref="lastname"
              name="lastname"
              placeholder="Last name"
              required="true"
            />
          </FormGroup>

          
           <FormGroup>
            <FormControl
              type="email"
              ref="email"
              name="email"
              placeholder="Email"
              required="true"
            />
          </FormGroup>

           <FormGroup>
            <FormControl
              type="password"
              ref="password"
              name="password"
              placeholder="Password"
              required="true"
            />
          </FormGroup>

          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Select your location. You can change it later... </ControlLabel>
            <FormControl componentClass="select" ref="location" placeholder="select" required="true">
              { this.props.locations.map(function(location) {
                return <option key={location._id} value={location.name}>{location.name}</option>;
              })}
            </FormControl>
          </FormGroup>
                    
          <Button type="submit" bsStyle="success">Register</Button>
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
