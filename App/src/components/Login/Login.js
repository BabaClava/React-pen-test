import React from 'react';
import LoginForm from '../commons/Forms/LoginForm';

const Login = props => {
    const onSubmit = (data) => {
        console.log(data)
    }
    return (    
        <div>
            <h1>Login</h1>
            <LoginForm onSubmit={onSubmit}/>
        </div>
    )
}
 
export default Login;