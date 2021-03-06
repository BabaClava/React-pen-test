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
    getProfile(id) {
        console.warn('unsafe method, pls use ProfileApi');
        return ProfileApi.getProfile(id)
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

export const ProfileApi = {
    getProfile(id) {
        return instance
            .get(`profile/${id}`)
            .then(res => res.data)
    },
    updateProfile(data) {
        return instance
            .put(`profile`, {data})
            .then(res => res.data)
    },
    getStatus(id) {
        return instance
            .get(`profile/status/${id}`)
            .then(res => res.data)
    },
    updateStatus(status) {
        return instance
            .put('profile/status', {status})
            .then(res => res.data)
    },
    updateAvatar(data) {
        return instance
            .put('profile/photo', data, {headers: {'Content-Type': 'multipart/form-data'}})
            .then(res => res.data)
    },
}

export const AuthApi = {
    getAuth() {
        return instance
            .get('auth/me')
            .then(res => res.data)
    },
    logIn(data) {
        return instance
            .post('auth/login', data)
            .then(res => res.data)
    },
    logOut() {
        return instance
            .delete('auth/login')
            .then(res => res.data)
    }
}