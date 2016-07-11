import React, { Component, PropTypes }  from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Messages } from '../../api/messages.js';
import Message from '../components/message.jsx';

import { Panel, Well, Row, Col, Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { getInputValue } from '../../modules/get-input-value';

class Messaging extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit(event) {
    event.preventDefault();

    const text = getInputValue(this.refs.textInput).trim();
    if ( text.length > 0 ) {
      Meteor.call('message.send', text);
    }
    ReactDOM.findDOMNode(this.refs.textInput).value ='';
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
    if (this.props.dataIsReady) {
      return (
        <div>
          <Row>
            <Col xs={ 12 } sm={ 8 }  smOffset={ 2 } >

                <Panel header={this.getLocation()}>
                  <div id="messages-container">
                    <ul>
                      {this.renderMessages()}
                    </ul>
                  </div>
                </Panel>

                <Well className="text-center">
                  <Form inline className="send-form" onSubmit={this.handleSubmit.bind(this)}> 
                    <FormGroup>
                      <FormControl 
                      type="text"
                      ref="textInput"
                      name="textInput"
                      placeholder="Type message..."
                      />
                    </FormGroup>
                    &nbsp;
                    <Button type="submit" bsStyle ={ "info" }>
                      Send
                    </Button>
                  </Form>
                </Well>

            </Col>
          </Row>
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
