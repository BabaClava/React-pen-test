import React from 'react';
import s from './formFields.module.sass'

export const TextField = ({
    input,
    placeholder,
    type,
    inputClassName,
    errorClassName,
    meta: { touched, error, warning }
  }) => (
    <div>
        <input {...input} placeholder={placeholder} type={type} className={inputClassName}/>
        {touched && error && <span className={errorClassName || s.textError}>{error}</span>}
    </div>
)
 