import React from 'react';
import { Field, reduxForm } from 'redux-form'

const Form = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <label>Login</label>
                <div>
                    <Field
                        name='login'
                        component='input'
                        type='text'
                        placeholder='login'
                    />
                </div>
            </div>
            <div>
                <label>Password</label>
                <div>
                    <Field
                        name='password'
                        component='input'
                        type='password'
                        placeholder='password'
                    />
                </div>
            </div>
            <div>
                <label>Remember Me</label>
                <div>
                    <Field
                        name='rememberMe'
                        component='input'
                        type='checkbox'
                    />
                </div>
            </div>
            <div>
                <button
                    type='submit'
                    disabled={props.pristine}
                >Login
                </button>
            </div>
        </form>
    );
}

const LoginForm = reduxForm({form: 'login'})(Form);

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