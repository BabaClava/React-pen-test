import React,{ Suspense, lazy } from 'react';
import './App.sass';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col } from 'reactstrap';
import Navbar from './components/Navbar/Navbar';
import {Route, Switch, Redirect} from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import Preloader from './components/commons/Preloader';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';

const UsersContainer = lazy(() => import('./components/Users/UsersContainer'));

const App = (props) => {
  
  return (
    <Container className="app-wrapper p-0" no-gutters='true'>
      <Row noGutters>
        <HeaderContainer />
      </Row>
      <Row noGutters>
        <Col tag='aside' xs="2">
          <Navbar />
        </Col>
        <Col tag="main"  className="content">
          <Suspense fallback={<Preloader/>}>  
            <Switch>
              <Redirect from="/" exact to="/profile" />
              <Route path="/profile/:id?" render={() => <ProfileContainer />} />
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
