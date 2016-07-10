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

  componentDidUpdate() {
    var container = document.getElementById("messages-container");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }    
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

  getLocation() {
    return this.props.currentUser.profile.location;
  }

  render() {
    console.log('render');
    if (this.props.dataIsReady) {
      return (
        <div className="container">
        <h1>Messages: <em>{this.getLocation()}</em></h1>

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
    } else {
      return (<div>Loading data...</div>);
    }
  }
}

Messaging.propTypes = {
  messages: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
};

export const MessagingContainer = createContainer(() => {
  const dataHandle = Meteor.subscribe('messages');
  const dataIsReady = dataHandle.ready();
  
  return {
    messages: Messages.find({}, { sort : { createdAt: 1 } }).fetch(),
    currentUser: Meteor.user(),
    dataIsReady,
  };
}, Messaging);
