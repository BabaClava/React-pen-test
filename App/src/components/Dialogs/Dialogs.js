import React from 'react';
import {Row, Col} from 'reactstrap';
import Dialog from './Dialog/Dialog';
import Message from './Message/Message';
import { reduxForm } from 'redux-form'
import MessageForm from '../commons/MessageForm'

const Dialogs = (props) => {
    let dialogsElements = props.dialogsData
        .map( el => <Dialog name={el.name} id={el.id}/> );
    
    let messageElements = props.messagesData
        .map( el => <Message message = {el.message}/>);

    let onMessageSend = (data) => props.onMessageSend(data.message);

    const Form = reduxForm({form:'dialogs'})(MessageForm);
    return (
      <Row className="dialogsContainer p-3">
        <Col xs="2" className="dialogsItems">
          {dialogsElements}
        </Col>
        <Col className="messages">
          <div>{messageElements}</div>
          <Form onSubmit={onMessageSend}/>
        </Col>
      </Row>
    );
}
 
export default Dialogs;