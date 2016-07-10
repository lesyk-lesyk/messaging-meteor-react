import { Meteor } from 'meteor/meteor';

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { App } from '../../ui/layouts/app.jsx';

import { Messaging } from '../../ui/pages/messaging.jsx';
import { UserSettings } from '../../ui/pages/user-settings.jsx';
import { Welcome } from '../../ui/pages/welcome.jsx';
import { CreateAccount } from '../../ui/pages/create-account.jsx';
import { NotFound } from '../../ui/pages/not-found.jsx';

const requireAuth = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/welcome',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

Meteor.startup( () => {
  render( 
    <Router history={ browserHistory }>
      <Route path="/" component={ App } onEnter={ requireAuth }>
        <IndexRoute component={ Messaging } />
        <Route path="/settings" component={ UserSettings } />
      </Route>
      <Route path="/welcome" component={ Welcome } />
      <Route path="/create-account" component={ CreateAccount } />
      <Route path="*" component={ NotFound } />
    </Router>,
    document.getElementById( 'react-root' ) 
  );
});
