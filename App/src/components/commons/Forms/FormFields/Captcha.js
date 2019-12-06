import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export default function ({
    input,
    className,
    errorClassName,
    meta: { touched, error, warning },
    captchaRef
  }) { 
    return (
        <div>
            <ReCAPTCHA
                {...input}
                className={className}
                sitekey="6Lf3ucUUAAAAAAK3EZqH5Cbj4HVRNSf1VTS6uOLo"
                hl="en"
                ref={captchaRef}
            />
            {touched && error && <span className={errorClassName}>{error}</span>}
        </div>
        )
    }
