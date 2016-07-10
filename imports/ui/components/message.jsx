import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

export default class Message extends Component {
  deleteThisMessage() {
    Meteor.call('message.delete', this.props.message._id);
  }

  render() {
    const messageTextClassName = classnames({
      "message-deleted": this.props.message.deleted,
    });

     return (
      <li className="message">
        <span className="user-info"></span>
          <strong>{this.props.message.username}</strong>:&nbsp;
        <span className={messageTextClassName}>
          {this.props.message.text}
        </span>

        { 
          this.props.message.owner == this.props.currentUserId && !this.props.message.deleted ? (
            <button className="delete" onClick={this.deleteThisMessage.bind(this)}>&times;</button> 
            ) : '' 
        }

      </li>
    );
  }
}

Message.propTypes = {
  message: PropTypes.object.isRequired,
};
