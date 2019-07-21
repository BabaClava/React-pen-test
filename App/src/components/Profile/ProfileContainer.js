import React, { Component } from 'react';
import Profile from './Profile';
import * as axios from 'axios';
import {connect} from 'react-redux';
import {setUserProfile} from '../../redux/profile-reducer';
import {withRouter} from 'react-router-dom'

class ProfileContainer extends Component {

    componentDidMount() {
        const id = this.props.match.params.id || 2
        axios.get(`http://localhost:3002/api/profile/${id}`)
            .then((response) => this.props.setUserProfile(response.data))
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