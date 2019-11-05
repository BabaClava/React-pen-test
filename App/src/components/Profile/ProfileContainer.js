import React, { Component } from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {getProfileData, getStatusData, updateStatus} from '../../redux/profile-reducer';
import {withRouter} from 'react-router-dom';
import {withAuthRedirect} from '../../hoc/withRedirect'
import {compose} from 'redux';
import { getAuthStatus, getUserId } from '../../redux/auth-selectors';
import { getProfile, getStatus } from '../../redux/profile-selectors';

class ProfileContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            defaultId: props.authorizedId
        }
    }

    componentDidMount() {
        let id = this.props.match.params.id || this.props.authorizedId;
        this.props.getProfileData(id)
        this.props.getStatusData(id)
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.match.params.id !== prevProps.match.params.id) {
            this.props.getProfileData(this.state.defaultId)
            this.props.getStatusData(this.state.defaultId)
        }
    }

    
    render() { 
        return ( 
            <Profile {...this.props} profile={this.props.profile}/>
        );
    }
}
 
const mapStateToProps = (state) => ({
    profile: getProfile(state),
    status: getStatus(state),
    isAuth: getAuthStatus(state),
    authorizedId: getUserId(state)
})

const mapDispatchToProps = {
    getProfileData,
    getStatusData,
    updateStatus
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    withAuthRedirect
)(ProfileContainer)
