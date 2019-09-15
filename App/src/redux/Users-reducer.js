import { UserApi } from "../api";

const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const SET_USERS = 'users/SET_USERS';
const SET_TOTAL_COUNT = 'users/SET_TOTAL_COUNT';
const IS_FETCHING_TOGGLER = 'users/IS_FETCHING_TOGGLER';
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE';
const FOLLOWING_PROGRESS_TOGGLER = 'users/FOLLOWING_PROGRESS_TOGGLER';

let initialState = {
    users: [],
    pageSize: 4,
    totalCount: 0,
    isFetching: false,
    currentPage: 1,
    followingInProgress: []
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map( user => {
                    if (user.id === action.id) {
                        return {...user, followed: true}
                    }
                    return user;
                })
            };
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map( user => {
                    if (user.id === action.id) {
                        return {...user, followed: false}
                    }
                    return user;
                })
            };
        case SET_USERS:
            return {
                ...state,
                users: [...action.users],
            }
        case SET_TOTAL_COUNT:
            return {
                ...state,
                totalCount: action.totalCount
            }
        case IS_FETCHING_TOGGLER:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case FOLLOWING_PROGRESS_TOGGLER:
            return {
                ...state,
                followingInProgress: action.isFetching
                ? [...state.followingInProgress, action.id]
                : state.followingInProgress.filter(id => id !== action.id)
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.page
            }
        default:
            return state;
    }
}

//Action Creators
export const followSuccess = (id) => ({
    type: FOLLOW,
    id
});

export const unfollowSuccess = (id) => ({
    type: UNFOLLOW,
    id
});

export const setUsers = (users) => ({
    type: SET_USERS,
    users
});

export const setTotalCount = (totalCount) => ({
    type: SET_TOTAL_COUNT,
    totalCount
});

export const isFetchingToggler = (isFetching) => ({
    type: IS_FETCHING_TOGGLER,
    isFetching
});

export const followingInProgressToggler = (isFetching,id) => ({
    type: FOLLOWING_PROGRESS_TOGGLER,
    isFetching,
    id
})

export const setCurrentPage = (page) => ({
    type: SET_CURRENT_PAGE,
    page
});

//Thunks
export const getUsersList = (pageSize, currentPage) => {
    return (dispatch) => {
        dispatch(isFetchingToggler(true));
        UserApi.getUsers(pageSize, currentPage)
            .then(data => {
                setData(data, dispatch)
        });
    }
};

export const getPage = (pageSize, page) => {
    return (dispatch) => {
        dispatch(setCurrentPage(page));
        dispatch(isFetchingToggler(true));
        UserApi.getUsers(pageSize, page)
        .then(data => {
            setData(data, dispatch)
        });
    }
};

function setData(data, dispatch) {
    [setUsers(data.items),
    setTotalCount(data.totalCount),
    isFetchingToggler(false)].forEach(fn => dispatch(fn))
}

export const follow = (id) => {
    return (dispatch) => {
        followUnfollowFlow(UserApi.follow.bind(UserApi), id, followSuccess, dispatch)
    };
};

export const unfollow = (id) => {
    return (dispatch) => {
        followUnfollowFlow(UserApi.unfollow.bind(UserApi), id, unfollowSuccess, dispatch)
      };
}

function followUnfollowFlow(method, id, actionCreator, dispatch,) {
    dispatch(followingInProgressToggler(true, id));
    method(id)
        .then(data => {
            if (data.resultCode === 0) dispatch(actionCreator(id));
            dispatch(followingInProgressToggler(false, id));
        })
};

export default usersReducer;