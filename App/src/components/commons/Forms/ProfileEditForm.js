import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {lengthValidator as length} from './validators/index';
import {TextField, StyledCheckbox} from './FormFields';
import s from './forms.module.sass';

class ProfileEditForm extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextState !== this.state;
    }
    render() {
        let contacts = Object.keys(this.props.profile.contacts).map((el) => {
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
        const length10 = length(10);
        
        return (
            <form onSubmit={this.props.handleSubmit}>
                <div>
                    <label>Full Name: </label>
                    <Field
                        name='fullName'
                        component={TextField}
                        validate={[length10]}
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
                <div> 
                    <button
                        type='submit'
                        disabled={this.props.invalid}
                    >Save
                    </button>
                </div>
                {this.props.error && <div className={s.error}>{this.props.error}</div>}
            </form> 
        );
    }
}

export default reduxForm({form:'profileEdit', enableReinitialize: true})(ProfileEditForm)