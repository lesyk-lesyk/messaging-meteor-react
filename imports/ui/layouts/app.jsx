import React from 'react';
import Navigation from '../containers/navigation.jsx';
import { Grid } from 'react-bootstrap';

export const App = ( { children } ) => (
  <div>
    <Navigation />
    <Grid>
      { children }
    </Grid>
  </div>
)
