import React from 'react';
import { Link } from 'react-router';
import { Login } from '../components/login.jsx';

import { Grid, Row, Col, Jumbotron } from 'react-bootstrap';

export const Welcome = () => (
  <div>
    <Grid>
      <Jumbotron className="text-center">
        <Row>
        <Col xs={ 12 } sm={ 4 } smOffset={2}>
          <h2 className="text-info"> Welcome to Messaging App!</h2>
          <img className='logo-img'src={'/logo.png'} alt=""/>
        </Col>
        <Col xs={ 12 } sm={ 4 } >
          <p>Plese, login:</p>
          <Login />
          <br/>
          <p>Or <Link to="/create-account">Create Account</Link> </p> 
        </Col>
        </Row>
      </Jumbotron>
    </Grid>
  </div>
);

// <Col xs={ 4 } sm={ 4 } smOffset={0} xsOffset={4}>