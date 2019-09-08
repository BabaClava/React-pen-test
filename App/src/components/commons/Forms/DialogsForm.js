import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {TextField} from './FormFields/TextField'

const dialogTextForm = (props) => {
    const {handleSubmit, pristine} = props
    return (
        <form onSubmit={handleSubmit}>
            <label>new massage</label>
            <Field
                name='message'
                type='text'
                component={TextField}
                placeholder='message'
                errorClassName=''
            />
            <button disabled={pristine}>Send</button>
        </form>
    )
}

export default reduxForm({form:'dialogs'})(dialogTextForm);