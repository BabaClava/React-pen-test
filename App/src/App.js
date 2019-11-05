import React,{ Suspense, lazy, Component } from 'react';
import './App.sass';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col } from 'reactstrap';
import Navbar from './components/Navbar/Navbar';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import Preloader from './components/commons/Preloader';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import { compose } from 'redux';
import { connect } from "react-redux";
import { initialize } from "./redux/app-reducer";
import { getInitializeStatus } from './redux/app-selectors';

const Login = lazy(() => import('./components/Login/Login'));
const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer'));
const UsersContainer = lazy(() => import('./components/Users/UsersContainer'));

class App extends Component {
  componentDidMount() {
    this.props.initialize()
  }
  
  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }
    return (
      <Container className="app-wrapper p-0" no-gutters='true'>
        <Row noGutters>
          <HeaderContainer />
        </Row>
        <Row noGutters>
          <Col tag='aside' xs="2">
            <Navbar />
          </Col>
          <Col tag="main" className="content">
            <Suspense fallback={<Preloader />}>
              <Switch>
                <Redirect from="/" exact to="/login" />
                <Route path="/profile/:id?" render={() => <ProfileContainer />} />
                <Route path="/dialogs" render={() => <DialogsContainer />} />
                <Route path="/users" render={() => <UsersContainer />} />
                <Route path="/login" render={() => <Login />} />
              </Switch>
            </Suspense>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  initialized: getInitializeStatus(state)
})
const mapDispatchToProps = {
  initialize
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(App);
