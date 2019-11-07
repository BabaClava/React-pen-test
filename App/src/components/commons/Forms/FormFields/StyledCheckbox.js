import React from 'react';
import {css} from 'emotion';

export default function ({
    input,
    errorClassName,
    value,
    meta: { touched, error, warning }
  }) { 
    return (
        <div>
            <input {...input} className={css(checkbox)} type='checkbox' checked={input.value}/>
            {touched && error && <span className={errorClassName}>{error}</span>}
        </div>
        )
     }

const checkbox = {
        WebkitAppearance: 'none',
        MozAppearance: 'none',
        appearance: 'none',
        backgroundColor: '#fafafa',
        border: '1px solid lightgrey',
        borderRadius: '26px',

        WebkitBoxShadow: 'inset 0 0 0 1px lightgrey',
        boxShadow: 'inset 0 0 0 1px lightgrey',
        cursor: 'pointer',
        height: '28px',
        position: 'relative',

        WebkitTransition: 'border .25s .15s, box-shadow .25s .3s, padding .25s',
        MozTransition: 'border .25s .15s, box-shadow .25s .3s, padding .25s',
        OTransition: 'border .25s .15s, box-shadow .25s .3s, padding .25s',
        MsTransition: 'border .25s .15s, box-shadow .25s .3s, padding .25s',
        transition: 'border .25s .15s, box-shadow .25s .3s, padding .25s',
        width: '54px',
        verticalAlign: 'top',
        outline: 'none',

    '&:after': {
        backgroundColor: 'white',
        border: '1px solid lightgrey',
        borderRadius: '24px',

        WebkitBoxShadow: 'inset 0 -3px 3px rgba(0, 0, 0, 0.025), 0 1px 4px rgba(0, 0, 0, 0.15), 0 4px 4px rgba(0, 0, 0, 0.1)',
        boxShadow: 'inset 0 -3px 3px rgba(0, 0, 0, 0.025), 0 1px 4px rgba(0, 0, 0, 0.15), 0 4px 4px rgba(0, 0, 0, 0.1)',
        content: '""',
        display: 'block',
        height: '24px',
        left: '0',
        position: 'absolute',
        right: '26px',
        top: '0',

        WebkitTransition: 'border .25s .15s, left .25s .1s, right .15s .175s',
        MozTransition: 'border .25s .15s, left .25s .1s, right .15s .175s',
        OTransition: 'border .25s .15s, left .25s .1s, right .15s .175s',
        MsTransition: 'border .25s .15s, left .25s .1s, right .15s .175s',
        transition: 'border .25s .15s, left .25s .1s, right .15s .175s',
    },

    '&:checked': {
        borderColor: '#53d76a',

        WebkitBoxShadow: 'inset 0 0 0 13px #53d76a',
        boxShadow: 'inset 0 0 0 13px #53d76a',
        paddingLeft: '18px',

        WebkitTransition: 'border .25s, box-shadow .25s, padding .25s .15s',
        MozTransition: 'border .25s, box-shadow .25s, padding .25s .15s',
        OTransition: 'border .25s, box-shadow .25s, padding .25s .15s',
        MsTransition: 'border .25s, box-shadow .25s, padding .25s .15s',
        transition: 'border .25s, box-shadow .25s, padding .25s .15s',
    },

    '&:checked:after': {
        borderColor: '#53d76a',
        left: '26px',
        right: '0',

        WebkitTransition: 'border .25s, left .15s .25s, right .25s .175s',
        MozTransition: 'border .25s, left .15s .25s, right .25s .175s',
        OTransition: 'border .25s, left .15s .25s, right .25s .175s',
        MsTransition: 'border .25s, left .15s .25s, right .25s .175s',
        transition: 'border .25s, left .15s .25s, right .25s .175s',
    }
}