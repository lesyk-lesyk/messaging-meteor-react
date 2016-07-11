import { Meteor } from 'meteor/meteor';

Meteor.users.allow({
  update: function(userId, doc, fields, modifier) {
    if (userId && doc) {
      return true;
    }
  }
});
