import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

import { createContainer } from 'meteor/react-meteor-data';
import { Locations } from '../../api/locations.js';

class UserSettings extends Component {
  handleSubmit(event) {
    event.preventDefault();

    var email = this.refs.email.value.trim();
    var firstname = this.refs.firstname.value.trim();
    var lastname = this.refs.lastname.value.trim();
    var location = this.refs.location.value.trim();
    var oldPassword = this.refs.oldPassword.value.trim();
    var newPassword = this.refs.newPassword.value.trim();
    var newPasswordAgain = this.refs.newPasswordAgain.value.trim();

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
        console.log('changePassword');
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
          <h2>Edit profile:</h2>
          <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" ref="firstname" placeholder="First name..." defaultValue = {user.profile.firstname} required="required"/><br/>
          <input type="text" ref="lastname" placeholder="Last name..." defaultValue = {user.profile.lastname} required="required"/><br/>    
          <input type="text" ref="email" placeholder="Email..." defaultValue = {user.emails[0].address} required="required"/><br/> 
          <input type="password" ref="oldPassword" placeholder="Old password..." /><br/>
          <input type="password" ref="newPassword" placeholder="New password..." /><br/>
          <input type="password" ref="newPasswordAgain" placeholder="New password again..." /><br/><br/>
          <select name="location" ref="location" defaultValue={user.profile.location}>
          { this.props.locations.map(function(location) {
            return <option key={location._id} value={location.name}>{location.name}</option>;
          })}
          </select><br/><br/>

          <input type="submit" value="Update"/>
          </form>
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
