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

  handleSubmit(event) {
    event.preventDefault();

    const text = this.refs.textInput.value.trim();
    if ( text.length > 0 ) {
      Meteor.call('message.send', text);
    }
    this.refs.textInput.value = '';
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

        <div id="messages-container">
          <ul>
            {this.renderMessages()}
          </ul>
        </div>

        <form className="send-form" onSubmit={this.handleSubmit.bind(this)}>
          <input 
            type="text"
            ref="textInput"
            placeholder="Type message..."
          />
          <input type="submit" value="Send"/>
        </form>
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
    messages: Messages.find({}, { sort : { createdAt: 1 } }).fetch(),
    currentUser: Meteor.user(),
  };
}, Messaging);
