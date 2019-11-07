import React from 'react';
import s from './formFields.module.sass'

export default ({
    input,
    placeholder,
    type,
    errorClassName,
    meta: { touched, error, warning }
  }) => (
    <div>
        <input {...input} placeholder={placeholder} type={type}/>
        {touched && error && <span className={errorClassName || s.textError}>{error}</span>}
    </div>
)