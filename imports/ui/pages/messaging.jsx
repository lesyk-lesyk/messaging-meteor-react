import React, { Component, PropTypes }  from 'react';
import ReactDom from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Messages } from '../../api/messages.js';
import Message from '../components/message.jsx';

class Messaging extends Component {
  constructor(props) {
    super(props);
  }

  renderMessages() {
    return this.props.messages.map((message) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id

      return (
        <Message 
          key={message._id} 
          message={message}
          currentUserId={currentUserId}
        />
      )
    });
  }

  render() {
    return (
      <div className="container">
        <h1>Messages</h1>
        <ul>
          {this.renderMessages()}
        </ul>
      </div>
    );
  }
}

Messaging.propTypes = {
  messages: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
};

export const MessagingContainer = createContainer(() => {
  Meteor.subscribe('messages');
  
  return {
    messages: Messages.find({}).fetch(),
    currentUser: Meteor.user(),
  };
}, Messaging);
