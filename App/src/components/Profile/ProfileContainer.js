import React, { Component } from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {getProfile, getStatus, updateStatus} from '../../redux/profile-reducer';
import {withRouter} from 'react-router-dom';
import {withAuthRedirect} from '../../hoc/withRedirect'
import {compose} from 'redux';

class ProfileContainer extends Component {

    componentDidMount() {
        const id = this.props.match.params.id || 76168296
        this.props.getProfile(id)
        this.props.getStatus(id)
    }

    render() { 
        return ( 
            <Profile {...this.props} profile={this.props.profile}/>
        );
    }
}
 
const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status
})

const mapDispatchToProps = {
    getProfile,
    getStatus,
    updateStatus
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    withAuthRedirect
)(ProfileContainer)
