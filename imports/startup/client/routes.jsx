import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { App } from '../../ui/layouts/app.jsx';
import { Messaging } from '../../ui/pages/messaging.jsx';

import { UserSettings } from '../../ui/pages/user-settings.jsx';
import { Welcome } from '../../ui/pages/welcome.jsx';

import { NotFound } from '../../ui/pages/not-found.jsx';

Meteor.startup( () => {
  render( 
    <Router history={ browserHistory }>
      <Route path="/" component={ App }>
        <IndexRoute component={ Messaging } />
        <Route path="/settings" component={ UserSettings } />
      </Route>
      <Route path="/welcome" component={ Welcome } />
      <Route path="*" component={ NotFound } />
    </Router>,
    document.getElementById( 'react-root' ) 
  );
});
