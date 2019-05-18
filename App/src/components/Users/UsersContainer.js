import { connect } from 'react-redux';
import { test, followChange } from '../../redux/Users-reducer';
import Users from './Users';

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users
    }
}

const mapDispatchToProps = {
    onTestClick: test,
    onFollowChange: followChange
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;