import Dialogs from './Dialogs';
import { addMessage } from '../../redux/dialogs-reducer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {withAuthRedirect} from '../../hoc/withRedirect';
import { getDialogs, getMessages } from '../../redux/dialogs-selectors';

let mapStateToProps = (state) => {
    return {
        dialogsData: getDialogs(state),
        messagesData: getMessages(state)
    }
}

let mapDispatchToProps = {
    onMessageSend: addMessage
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);