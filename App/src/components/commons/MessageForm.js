import React from 'react';
import {Field} from 'redux-form'


const MessageForm = (props) => {
    return ( 
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    name='message'
                    component='input'
                    type='text'
                    placeholder='new message'
                />
            </div>
            <div>
                <button
                    disabled={props.pristine}
                >Send</button>
            </div>
        </form>
    );
}
 
export default MessageForm;