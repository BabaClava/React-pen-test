import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {lengthValidator as length} from './validators/index';
import StyledCheckbox from './FormFields/StyledCheckbox';

const ProfileEditForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                Тут могла быть ваша реклама
            </div>
        </form> 
    );
}
 
export default ProfileEditForm;