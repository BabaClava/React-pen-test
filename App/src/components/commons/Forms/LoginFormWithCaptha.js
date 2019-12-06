import React, { useRef } from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField, Captcha } from './FormFields';
import { lengthValidator as length } from './validators/index'
import s from './forms.module.sass';
import StyledCheckbox from './FormFields/StyledCheckbox';

const length10 = length(10);
const LoginFormWithCaptcha = (props) => {
    const captchaRef = useRef();
    const onSubmit = (formData) => {
        captchaRef.current && captchaRef.current.reset();
        props.handleSubmit(formData);
    }
    return (
        <form onSubmit={onSubmit}>
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
                        component={StyledCheckbox}
                    />
                </div>
            </div>
            <div>
                {props.showCaptcha && <Field
                    name='captcha'
                    component={Captcha}
                    captchaRef={captchaRef}
                />}
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

export default reduxForm({form:'login', initialValues: { rememberMe: false }})(LoginFormWithCaptcha)