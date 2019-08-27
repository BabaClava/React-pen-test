import Axios from "axios";

const instance = Axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:3002/api/'
})

export const UserApi = {
    getUsers(pageSize, currentPage) {
        return instance
            .get(`users?count=${pageSize}&page=${currentPage}`)
            .then(res => res.data)
    },
    getAuth() {
        return instance
            .get('auth/me')
            .then(res => res.data)
    },
    getProfile(id) {
        return instance
            .get(`profile/${id}`)
            .then(res => res.data)
    },
    follow(id) {
        return instance
            .post(`follow/${id}`,{})
            .then(res => res.data)
    },
    unfollow(id) {
        return instance
            .delete(`follow/${id}`)
            .then(res => res.data)
    }
}