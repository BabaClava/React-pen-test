import React, { Component } from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {getProfile} from '../../redux/profile-reducer';
import {withRouter} from 'react-router-dom'

class ProfileContainer extends Component {

    componentDidMount() {
        const id = this.props.match.params.id || 2
        this.props.getProfile(id)
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
    getProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProfileContainer));