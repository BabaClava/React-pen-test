import React, { Component } from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { logOut } from '../../redux/auth-reducer';
import { getAuthStatus, getLogin } from '../../redux/auth-selectors';

class HeaderContainer extends Component {
    render() { 
        return (
            <Header {...this.props}/>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuth: getAuthStatus(state),
    login: getLogin(state)
});
const mapDispatchToProps = {
    logOut
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);