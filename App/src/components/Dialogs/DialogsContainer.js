import Dialogs from './Dialogs';
import { updateMessageText, addMessage } from '../../redux/dialogs-reducer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {withAuthRedirect} from '../../hoc/withRedirect';

let mapStateToProps = (state) => {
    return {
        dialogsData: state.dialogsPage.dialogsData,
        messagesData: state.dialogsPage.messagesData,
        newMessageText: state.dialogsPage.newMessageText
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onMessageTextChange: text => dispatch(updateMessageText(text)),
        onMessageSend: () => dispatch(addMessage())
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);