import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Messages = new Mongo.Collection('messages');

if (Meteor.isServer) {
  Meteor.publish('messages', function messagesPublication() {
    return Messages.find({
      location: Meteor.users.findOne(this.userId).profile.location,
    });
  });
}

Meteor.methods({
  'message.send'(text) {
    check(text, String);

    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Messages.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).profile.firstname,
      location: Meteor.users.findOne(this.userId).profile.location,
    });
  },

  'message.delete'(messageId) {
    check(messageId, String);

    const message = Messages.findOne(messageId);
    if ( message.owner !== this.userId) {
      throw new Meteor.Error('You are not-authorized or it`s not your message!');
    }
    Messages.update(messageId, { 
      $set: {
        text: 'Message deleted...' ,
        deleted: true,
      } 
    });
  },

});
