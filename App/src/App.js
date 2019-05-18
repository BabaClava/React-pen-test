import React from 'react';
import './App.sass';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col } from 'reactstrap';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import {Route, Switch, Redirect} from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';


const App = (props) => {
  
  return (
    <Container className="app-wrapper p-0" no-gutters="true">
      <Row noGutters>
        <Col tag='header'>
          <Header />
        </Col>
      </Row>
      <Row noGutters>
        <Col tag='sidebar' xs="2">
          <Navbar />
        </Col>
        <Col tag="main"  className="content">
          <Switch>
            <Redirect from="/" exact to="/profile" />
            <Route path="/profile" render={() => <Profile />} />
            <Route path="/dialogs" render={() => <DialogsContainer />} />
            <Route path="/users"   render={() => <UsersContainer /> } />
          </Switch>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
