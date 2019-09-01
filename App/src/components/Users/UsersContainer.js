import React, { Component } from 'react';
import { connect } from 'react-redux';
import { test, 
         follow,
         unfollow,
         getUsers,
         getPage } from '../../redux/Users-reducer';
import Users from './Users';
import loader from '../../assets/img/loader.svg';
import Paginator from '../commons/Paginator';
import {compose} from 'redux';
import { withAuthRedirect } from '../../hoc/withRedirect';

class UsersAPIComponent extends Component {
  componentDidMount() {
    this.props.getUsers(this.props.pageSize, this.props.currentPage)
  }

  onPageChange = (page) => {
    this.props.getPage(this.props.pageSize ,page)
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
              followingInProgress={this.props.followingInProgress}
            />
        </>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
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
    getUsers,
    getPage
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(UsersAPIComponent);