import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

export default class Message extends Component {
  render() {
     return (
      <li className="message">
        <span className="user-info"></span>
          <strong>{this.props.message.username}</strong>:&nbsp;
        <span className="text">
          {this.props.message.text}
        </span>
      </li>
    );
  }
}

Message.propTypes = {
  message: PropTypes.object.isRequired,
};
