import React, { Component } from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {setUserProfile} from '../../redux/profile-reducer';
import {withRouter} from 'react-router-dom'
import { UserApi } from '../../api';

class ProfileContainer extends Component {

    componentDidMount() {
        const id = this.props.match.params.id || 2
        UserApi.getProfile(id)
            .then(data => this.props.setUserProfile(data))
    }

    render() { 
        return ( 
            <Profile {...this.props} profile={this.props.profile}/>
        );
    }
}
 
const mapStateToProps = (state) => ({
    profile: state.profilePage.profile
})

const mapDispatchToProps = {
    setUserProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProfileContainer));