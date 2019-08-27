import React, { Component } from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { setUserData } from '../../redux/auth-reducer';
import { UserApi } from '../../api';

class HeaderContainer extends Component {
    componentDidMount() {
        UserApi.getAuth()
            .then(data => {
                if (data.resultCode === 0) {
                    let {id, email, login} = data.data
                    this.props.setUserData(id, email, login);
                }
            })

    }
    render() { 
        return (
            <Header {...this.props}/>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
});
const mapDispatchToProps = {
    setUserData
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);