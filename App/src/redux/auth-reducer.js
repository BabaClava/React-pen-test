import { AuthApi } from "../api";
import { stopSubmit } from 'redux-form';

const SET_USER_DATA = 'auth/SET_USER_DATA';
const SET_CAPTCHA_REQUIRED = 'auth/SET_CAPTCHA_REQUIRED'

const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    showCaptcha: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
            }
        case SET_CAPTCHA_REQUIRED:
            return {
                ...state,
                showCaptcha: action.value
        }
        default:
            return state;
    }
}

//Action Creators
export const setUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA,
    data: {
        userId,
        email,
        login,
        isAuth
    }
});
export const setShowCaptcha = (value) => ({
    type: SET_CAPTCHA_REQUIRED,
    value
})

//Thunks
export const getAuth = () => {
    return dispatch => {
        return AuthApi.getAuth()
            .then(data => {
                if (data.resultCode === 0) {
                    let {id, email, login} = data.data
                    dispatch(setUserData(id, email, login, true));
                }
            })
    }
}
export const logIn = (loginData) => {
    return dispatch => {
        AuthApi.logIn(loginData)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(getAuth());
                    dispatch(setShowCaptcha(false))
                } else if (data.resultCode === 10) {
                    dispatch(stopSubmit('login', {_error: data.messages[0] || 'some error'}))
                    dispatch(setShowCaptcha(true))
                } else {
                    dispatch(stopSubmit('login', {_error: data.messages[0] || 'some error'}))
                }
            })
    }
}
export const logOut = () => dispatch => {
    AuthApi.logOut()
        .then(data => {
            if(data.resultCode === 0) {
                dispatch(setUserData(null, null, null, false))
            }
        })
}

export default authReducer;