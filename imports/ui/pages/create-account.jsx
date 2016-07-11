import React from 'react';
import { RegisterContainer } from '../components/register.jsx';
import { Link } from 'react-router';

import { Grid, Row, Col, Jumbotron } from 'react-bootstrap';

export const CreateAccount = () => (
  <div>
    <Grid>
      <Jumbotron className="text-center">
        <Row>
          <Col xs={ 12 } sm={ 4 } smOffset={4} >
            <p>Create New Account or <Link to="welcome">Login</Link></p>
            <RegisterContainer />
          </Col>
        </Row>
      </Jumbotron>
    </Grid>
  </div>
);
