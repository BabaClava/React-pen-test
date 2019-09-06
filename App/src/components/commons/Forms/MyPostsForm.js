import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {TextField} from './FormFields/TextField'

const MyPostsTextForm = (props) => {
    const {handleSubmit, pristine} = props
    return (
        <form onSubmit={handleSubmit}>
            <label>new post</label>
            <Field
                name='message'
                type='text'
                component={TextField}
                placeholder='post text'
            />
            <button disabled={pristine}></button>
        </form>
    )
}

export default reduxForm({form:'myPosts'})(MyPostsTextForm);