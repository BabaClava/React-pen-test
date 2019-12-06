import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'

export default (props) =>{
    return (
        <Modal isOpen={props.isOpen} toggle={props.onClose}>
            <ModalHeader toggle={props.onClose}>
                Error!
            </ModalHeader>
            <ModalBody>
                {props.children}
            </ModalBody>
            <ModalFooter>
                <Button onClick={props.onClose}>Close</Button>
            </ModalFooter>
        </Modal>
    );
}