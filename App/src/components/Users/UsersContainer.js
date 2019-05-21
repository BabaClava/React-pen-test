import React, { Component } from 'react';
import { connect } from 'react-redux';
import { test, 
         followChange, 
         setUsers, 
         setTotalCount, 
         isFetchingToggler,
         setCurrentPage } from '../../redux/Users-reducer';
import Users from './Users';
import * as axios from 'axios';
import loader from '../../assets/img/loader.svg';
import Paginator from '../commons/Paginator';

class UsersAPI extends Component {
  componentDidMount() {
    this.props.isFetchingToggler(true);
    axios.get(`http://localhost:8080/users?count=${this.props.pageSize}&page=${this.props.currentPage}`)
    .then(res => {
      this.props.setUsers(res.data.items);
      this.props.setTotalCount(res.data.TotalCount);
      this.props.isFetchingToggler(false)
    });
  }

  onPageChange = (page) => {
      this.props.setCurrentPage(page);
      this.props.isFetchingToggler(true);
      axios.get(`http://localhost:8080/users?count=${this.props.pageSize}&page=${page}`)
      .then(res => {
        this.props.setUsers(res.data.items);
        this.props.setTotalCount(res.data.TotalCount);
        this.props.isFetchingToggler(false)
    });
  }

  render() {
    return (
        <>
            <Paginator 
              pageSize={this.props.pageSize}
              totalCount={this.props.totalCount}
              currentPage={this.props.currentPage}
              onPageChange={this.onPageChange}
            />
            {this.props.isFetching && <div><img src={loader} alt='loader'/></div>}
            <Users
              users={this.props.users}
              onTestClick={this.props.onTestClick}
              onFollowChange={this.props.onFollowChange}
            />
        </>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        isFetching: state.usersPage.isFetching,
        currentPage: state.usersPage.currentPage,
        pageSize: state.usersPage.pageSize,
        totalCount: state.usersPage.totalCount
    }
}

const mapDispatchToProps = {
    onTestClick: test,
    onFollowChange: followChange,
    setUsers,
    setTotalCount,
    isFetchingToggler,
    setCurrentPage
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersAPI);

export default UsersContainer;