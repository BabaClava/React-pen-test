import React,{ Suspense, lazy } from 'react';
import './App.sass';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col } from 'reactstrap';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import {Route, Switch, Redirect} from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import Loader from './assets/Loader';

const UsersContainer = lazy(() => import('./components/Users/UsersContainer'));

const App = (props) => {
  
  return (
    <Container className="app-wrapper p-0" no-gutters='true'>
      <Row noGutters>
        <Header />
      </Row>
      <Row noGutters>
        <Col tag='aside' xs="2">
          <Navbar />
        </Col>
        <Col tag="main"  className="content">
          <Suspense fallback={<Loader/>}>  
            <Switch>
              <Redirect from="/" exact to="/profile" />
              <Route path="/profile" render={() => <Profile />} />
              <Route path="/dialogs" render={() => <DialogsContainer />} />
              <Route path="/users"   render={() => <UsersContainer /> } />
            </Switch>
          </Suspense> 
        </Col>
      </Row>
    </Container>
  );
}

export default App;
