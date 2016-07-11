import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

import { createContainer } from 'meteor/react-meteor-data';
import { Locations } from '../../api/locations.js';

import { getInputValue } from '../../modules/get-input-value';
import { Row, Col, Jumbotron, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

class UserSettings extends Component {
  handleSubmit(event) {
    event.preventDefault();

    var email = getInputValue(this.refs.email).trim();
    var firstname = getInputValue(this.refs.firstname).trim();
    var lastname = getInputValue(this.refs.lastname).trim();
    var location = getInputValue(this.refs.location).trim();
    var oldPassword = getInputValue(this.refs.oldPassword).trim();
    var newPassword = getInputValue(this.refs.newPassword).trim();
    var newPasswordAgain = getInputValue(this.refs.newPasswordAgain).trim();

    Meteor.users.update( { _id: Meteor.userId() }, { $set: {
      'emails.0.address': email,
      'profile.firstname': firstname,
      'profile.lastname': lastname,
      'profile.location': location,
    }}, function(err) {
        if(err) {
          if (err.reason) {
            alert(err.reason);
          }
        } else {
          alert('Profiile updated!')
        }
      } );

    if (oldPassword.length>0 || newPassword.length>0 || newPasswordAgain.length>0) { 
      if (oldPassword !== newPassword && newPassword === newPasswordAgain && newPassword.length !==0) {
        Accounts.changePassword(oldPassword, newPassword, function(err) {
          if(err) {
            if (err.reason) {
              alert(err.reason);
            }
          } else {
            alert('Password updated!')
          }
        });
      } else {
        alert('Passwords are the same or didn`t match!');
      }
    } 
  }

  render() {
    if (this.props.dataIsReady) {
      var user = this.props.currentUser;
      return (
        <div>
        <Jumbotron className="text-center">
          <Row>
            <Col xs={ 12 } sm={ 4 } smOffset={4}>
              <h2 className="text-info">Edit profile</h2>
              <form onSubmit={this.handleSubmit.bind(this)}>

               <FormGroup>
                <FormControl
                  type="text"
                  ref="firstname"
                  name="firstname"
                  placeholder="First name"
                  required="true"
                  defaultValue = {user.profile.firstname}
                />
              </FormGroup>

               <FormGroup>
                <FormControl
                  type="text"
                  ref="lastname"
                  name="lastname"
                  placeholder="Last name"
                  required="true"
                  defaultValue = {user.profile.lastname}
                />
              </FormGroup>

              
               <FormGroup>
                <FormControl
                  type="email"
                  ref="email"
                  name="email"
                  placeholder="Email"
                  required="true"
                  defaultValue = {user.emails[0].address}
                />
              </FormGroup>

               <FormGroup>
                <FormControl
                  type="password"
                  ref="oldPassword"
                  name="oldPassword"
                  placeholder="Old password"
                />
              </FormGroup>

               <FormGroup>
                <FormControl
                  type="password"
                  ref="newPassword"
                  name="newPassword"
                  placeholder="New password"
                />
              </FormGroup>

               <FormGroup>
                <FormControl
                  type="password"
                  ref="newPasswordAgain"
                  name="newPasswordAgain"
                  placeholder="New password again"
                />
              </FormGroup>

              <FormGroup controlId="formControlsSelect">
                <ControlLabel>Select your location. </ControlLabel>
                <FormControl 
                  componentClass="select" 
                  ref="location" 
                  placeholder="select" 
                  required="true"
                  defaultValue={user.profile.location}>
                  { this.props.locations.map(function(location) {
                    return <option key={location._id} value={location.name}>{location.name}</option>;
                  })}
                </FormControl>
              </FormGroup>
                        
              <Button type="submit" bsStyle="success">Update</Button>

              </form>
            </Col>
          </Row>
        </Jumbotron>
        </div>
      );
    } else {
      return (<div>Loading data...</div>);
    }
  }
}

UserSettings.propTypes = {
  locations: PropTypes.array.isRequired,
};

export const UserSettingsContainer = createContainer(() => {
  const dataHandle = Meteor.subscribe('locations');
  const dataIsReady = dataHandle.ready();
  
  return {
    locations: Locations.find({}, { sort : { name: 1 } }).fetch(),
    currentUser: Meteor.user(),
    dataIsReady,
  };
}, UserSettings);
