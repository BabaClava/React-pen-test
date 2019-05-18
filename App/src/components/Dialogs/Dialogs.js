import React from 'react';
import {Row, Col} from 'reactstrap';
import Dialog from './Dialog/Dialog';
import Message from './Message/Message';

const Dialogs = (props) => {
    let dialogsElements = props.dialogsData
        .map( el => <Dialog name={el.name} id={el.id} /> );
    
    let messageElements = props.messagesData
        .map( el => <Message message = {el.message} />);

    let onMessageTextChange = e => {
      props.onMessageTextChange(e.target.value);
    };

    let onMessageSend = () => props.onMessageSend();

    return (
      <Row className="dialogsContainer p-3">
        <Col xs="2" className="dialogsItems">
          {dialogsElements}
        </Col>
        <Col className="messages">
          <div>{messageElements}</div>
          <div>
            <textarea
              placeholder={"new message"}
              value={props.newMessageText}
              onChange={onMessageTextChange}
            />
            <button onClick={onMessageSend}>Send</button>
          </div>
        </Col>
      </Row>
    );
}
 
export default Dialogs;