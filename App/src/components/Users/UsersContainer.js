import React, { Component } from 'react';
import { connect } from 'react-redux';
import { test, 
         follow,
         unfollow,
         setUsers, 
         setTotalCount, 
         isFetchingToggler,
         setCurrentPage,
         followingInProgressToggler } from '../../redux/Users-reducer';
import Users from './Users';
import loader from '../../assets/img/loader.svg';
import Paginator from '../commons/Paginator';
import { UserApi } from '../../api';

class UsersAPIComponent extends Component {
  componentDidMount() {
    this.props.isFetchingToggler(true);
    UserApi.getUsers(this.props.pageSize, this.props.currentPage)
    .then(data => {
      this.props.setUsers(data.items);
      this.props.setTotalCount(data.totalCount);
      this.props.isFetchingToggler(false)
    });
  }

  onPageChange = (page) => {
      this.props.setCurrentPage(page);
      this.props.isFetchingToggler(true);
      UserApi.getUsers(this.props.pageSize, page)
      .then(data => {
        this.props.setUsers(data.items);
        this.props.setTotalCount(data.totalCount);
        this.props.isFetchingToggler(false)
    });
  }

  get pagesCount() {
    return Math.ceil(this.props.totalCount / this.props.pageSize)
  }

  render() {
    return (
        <>
            <Paginator
              pagesCount={this.pagesCount}
              currentPage={this.props.currentPage}
              onPageChange={this.onPageChange}
            />
            {this.props.isFetching && <div><img src={loader} alt='loader'/></div>}
            <Users
              users={this.props.users}
              onTestClick={this.props.onTestClick}
              follow={this.props.follow}
              unfollow={this.props.unfollow}
              isFetching={this.props.isFetching}
              followingInProgress={this.props.followingInProgress}
              followingInProgressToggler={this.props.followingInProgressToggler}
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
        totalCount: state.usersPage.totalCount,
        followingInProgress: state.usersPage.followingInProgress
    }
}

const mapDispatchToProps = {
    onTestClick: test,
    follow,
    unfollow,
    setUsers,
    setTotalCount,
    isFetchingToggler,
    followingInProgressToggler,
    setCurrentPage
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersAPIComponent);

export default UsersContainer;