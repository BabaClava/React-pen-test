import React from 'react';
// import LoginForm from '../commons/Forms/LoginForm';
import { connect } from 'react-redux';
import { logIn } from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';
import { getAuthStatus, getShowCaptcha } from '../../redux/auth-selectors';
import LoginFormWithCaptcha from '../commons/Forms/LoginFormWithCaptha';

const Login = props => {
    const onSubmit = (formData) => {
        props.logIn(formData);
        // console.log(formData)
    }
    if (props.isAuth) {
        return <Redirect to='/profile' />
    }
    return (    
        <div>
            <h1>Login</h1>
            <LoginFormWithCaptcha 
                onSubmit={onSubmit} 
                showCaptcha={props.showCaptcha}
            />
        </div>
    )
}
 
const mapStateToProps = state => ({
    isAuth: getAuthStatus(state),
    showCaptcha: getShowCaptcha(state),
})
const mapDispatchToProps = {
    logIn
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);