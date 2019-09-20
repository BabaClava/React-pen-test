import React, { Component } from 'react';
import { connect } from 'react-redux';
import { follow,
         unfollow,
         getUsersList,
         getPage } from '../../redux/Users-reducer';
import Users from './Users';
import loader from '../../assets/img/loader.svg';
// import Paginator from '../commons/Paginator';
import Paginator from '../commons/PaginationWithReactstrap'
import {compose} from 'redux';
import { withAuthRedirect } from '../../hoc/withRedirect';
import { getUsers, getCurrentPage, getPageSize, getTotalCount, getFollowingStatus } from '../../redux/users-selectors';

class UsersAPIComponent extends Component {
  componentDidMount() {
    const {getUsersList, pageSize, currentPage} = this.props
    getUsersList(pageSize, currentPage)
  }
  // getPage = this.props.getPage;
  // pageSize = this.props.pageSize
  onPageChange = (page) => {
    const {getPage, pageSize} = this.props;
    getPage(pageSize ,page)
  }

  get pagesCount() {
    const {totalCount, pageSize} = this.props;
    return Math.ceil(totalCount / pageSize)
  }

  render() {
    const {
      currentPage, 
      users, 
      follow,
      unfollow, 
      followingInProgress, 
      isFetching
    } = this.props
    return (
        <>
            <Paginator
              pagesCount={this.pagesCount}
              currentPage={currentPage}
              onPageChange={this.onPageChange}
              portionSize={5}
            />
            {isFetching && <div><img src={loader} alt='loader'/></div>}
            <Users
              users={users}
              follow={follow}
              unfollow={unfollow}
              followingInProgress={followingInProgress}
            />
        </>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        totalCount: getTotalCount(state),
        followingInProgress: getFollowingStatus(state)
    }
}

const mapDispatchToProps = {
    follow,
    unfollow,
    getUsersList,
    getPage
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(UsersAPIComponent);