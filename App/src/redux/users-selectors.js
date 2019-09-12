export const getUsers = state => {
    return state.usersPage.users
}

export const getCurrentPage = state => {
    return state.usersPage.currentPage
}

export const getPageSize = state => {
    return state.usersPage.pageSize
}

export const getTotalCount = state => {
    return state.usersPage.totalCount
}

export const getFollowingStatus = state => {
    return state.usersPage.followingInProgress
}