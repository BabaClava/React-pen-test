import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {TextField} from './FormFields/TextField';
import {lengthValidator as length} from './validators/index'
import s from './forms.module.sass';

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
            {props.error && <div className={s.error}>{props.error}</div>}
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

export default reduxForm({form:'login', initialValues: { rememberMe: false }})(LoginForm)