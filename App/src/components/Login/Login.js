import React from 'react';
import LoginForm from '../commons/Forms/LoginForm';
import { connect } from 'react-redux';
import {logIn} from '../../redux/auth-reducer';
import {Redirect} from 'react-router-dom';
import { getAuthStatus } from '../../redux/auth-selectors';

const Login = props => {
    const onSubmit = (formData) => {
        props.logIn(formData);
    }
    if (props.isAuth) {
        return <Redirect to='/profile' />
    }
    return (    
        <div>
            <h1>Login</h1>
            <LoginForm onSubmit={onSubmit}/>
        </div>
    )
}
 
const mapStateToProps = state => ({
    isAuth: getAuthStatus(state)
})
const mapDispatchToProps = {
    logIn
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);