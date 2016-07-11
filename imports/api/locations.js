import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Locations = new Mongo.Collection('locations');

if (Meteor.isServer) {

  // just for training purposes:
  if (!Locations.find().fetch().length) {
    console.log('Seeding demo locations to database');
    Locations.insert({ name: 'Location 1' });
    Locations.insert({ name: 'Location 2' });
    Locations.insert({ name: 'Location 3' });
    Locations.insert({ name: 'Location 4' });
  }

  Meteor.publish('locations', function locationsPublication() {
    return Locations.find( { } );
  });
}
 