import React from 'react';
import Navigation from '../containers/navigation.jsx';

export const App = ( { children } ) => (
  <div>
    <Navigation />
    { children }
  </div>
)
