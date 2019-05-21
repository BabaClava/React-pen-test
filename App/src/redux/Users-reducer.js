const TEST = 'TEST';
const FOLLOW_CHANGE = 'FOLLOW_CHANGE';
const SET_USERS = 'SET_USERS';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const IS_FETCHING_TOGGLER = 'IS_FETCHING_TOGGLER';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

let initialState = {
    users: [],
    pageSize: 4,
    totalCount: 0,
    isFetching: false,
    currentPage: 1
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case TEST: 
            console.log('test');
            return {
                ...state
            };
        case FOLLOW_CHANGE:
            return {
                ...state,
                users: state.users.map( user => {
                    if (user.id === action.id) {
                        return {...user, follow: !user.follow}
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
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.page
            }
        default:
            return state;
    }
}

export const test = () => ({
    type: TEST
});

export const followChange = (id) => ({
    type: FOLLOW_CHANGE,
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

export const setCurrentPage = (page) => ({
    type: SET_CURRENT_PAGE,
    page
});

export default usersReducer;