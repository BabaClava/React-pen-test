import React from 'react';
import { Field, reduxForm, clearSubmitErrors } from 'redux-form';
import {TextField, StyledCheckbox} from './FormFields';
import s from './forms.module.sass';

class ProfileEditForm extends React.Component {
    render() {
        console.log('update')
        const contacts = Object.keys(this.props.profile.contacts).map((el) => {
            return (
                <li key={el}>
                    <label>{el}: </label>
                    <Field
                        name={`contacts.${el}`}
                        component={TextField} 
                        />
                </li>
            )
        })

        return (
            <form onSubmit={this.props.handleSubmit}>
                <div>
                    <label>Full Name: </label>
                    <Field
                        name='fullName'
                        component={TextField}
                    />
                </div>
                <div>
                    <label>About Me: </label>
                    <Field
                        name='aboutMe'
                        component={TextField}
                        type='text'
                    />
                </div>
                <div>
                    <label>Looking for a job: </label>
                    <Field
                        name='lookingForAJob'
                        component={StyledCheckbox}
                    />
                </div>
                <div>
                    <label>My professional skills: </label>
                    <Field
                        name='lookingForAJobDescription'
                        component={TextField}
                    />
                </div>
                    <span>Contacts:</span>
                <ul>{contacts}</ul>
                {this.props.error && <div className={s.error}>{this.props.error}</div>}
                <div> 
                    <button
                        type='submit'
                        disabled={this.props.invalid}
                    >Save
                    </button>
                </div>
            </form> 
        );
    }
}

export default reduxForm({form:'profileEdit',
enableReinitialize: true,
onChange: (values, dispatch, props) => {
    if (props.error) dispatch(clearSubmitErrors('profileEdit'));
  }
})(ProfileEditForm)