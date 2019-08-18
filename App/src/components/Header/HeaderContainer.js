import React, { Component } from 'react';
import Header from './Header';
import Axios from 'axios';
import { connect } from 'react-redux';
import { setUserData } from '../../redux/auth-reducer';

class HeaderContainer extends Component {
    componentDidMount() {
        Axios
            .get('http://localhost:3002/api/auth/me', {
                withCredentials: true,
            })
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, email, login} = response.data.data
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