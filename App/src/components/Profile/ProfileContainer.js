import React, { Component } from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {getProfileData,
        updateProfile, 
        getStatusData, 
        updateStatus, 
        editProfileToggler,
        editAvatarToggler,
        updateAvatar,} from '../../redux/profile-reducer';
import {withRouter} from 'react-router-dom';
import {withAuthRedirect} from '../../hoc/withRedirect'
import {compose} from 'redux';
import { getAuthStatus, getUserId } from '../../redux/auth-selectors';
import { getProfile, getStatus, getProfileEditMod, getAvatarEditMod } from '../../redux/profile-selectors';

class ProfileContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ownerId: props.authorizedId
        }
    }

    componentDidMount() {
        let id = this.props.match.params.id || this.props.authorizedId;
        this.props.getProfileData(id)
        this.props.getStatusData(id)
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.match.params.id !== prevProps.match.params.id) {
            this.props.getProfileData(this.state.ownerId)
            this.props.getStatusData(this.state.ownerId)
        }
    }

    get isOwner() {
        return this.props.ownerId === this.props.match.params.id
    }
 
    render() { 
        return ( 
            <Profile {...this.props} isOwner={this.isOwner}/>
        );
    }
}
 
const mapStateToProps = (state) => ({
    profile: getProfile(state),
    status: getStatus(state),
    isAuth: getAuthStatus(state),
    authorizedId: getUserId(state),
    profileEditMod: getProfileEditMod(state),
    avatarEditMod: getAvatarEditMod(state)
})

const mapDispatchToProps = {
    getProfileData,
    updateProfile,
    getStatusData,
    updateStatus,
    editProfileToggler,
    editAvatarToggler,
    updateAvatar,
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    withAuthRedirect
)(ProfileContainer)
