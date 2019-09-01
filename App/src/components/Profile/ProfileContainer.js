import React, { Component } from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {getProfile} from '../../redux/profile-reducer';
import {withRouter} from 'react-router-dom';
import {withAuthRedirect} from '../../hoc/withRedirect'
import {compose} from 'redux';

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

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    withAuthRedirect
)(ProfileContainer)
