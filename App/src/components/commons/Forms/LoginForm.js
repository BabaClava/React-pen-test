import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {TextField} from './FormFields/TextField';
import {lengthValidator as length} from './validators/index'

const length10 = length(10);
const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <label>Login</label>
                <div>
                    <Field
                        name='login'
                        component={TextField}
                        type='text'
                        placeholder='login'
                        validate={[length10]}
                    />
                </div>
            </div>
            <div>
                <label>Password</label>
                <div>
                    <Field
                        name='password'
                        component={TextField}
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
                    disabled={props.pristine || props.invalid}
                >Login
                </button>
            </div>
        </form>
    )
}

export default reduxForm({form:'login'})(LoginForm)