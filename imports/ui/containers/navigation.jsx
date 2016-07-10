import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import { Navigation } from '../components/navigation';

const composer = (props, onData) => {
  onData(null, { hasUser: Meteor.user() });
};

export default composeWithTracker(composer, {}, {}, { pure: false })(Navigation);
