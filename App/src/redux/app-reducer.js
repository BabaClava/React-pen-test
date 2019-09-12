import { getAuth } from "./auth-reducer";

const SET_INITIALIZED = 'SET_INITIALIZED';

const initialState = {
    initialized: false
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

//action creators
export const setInitialized = () => ({
    type: SET_INITIALIZED
})

//thunks
export const initialize = () => dispatch => {
    let auth = dispatch(getAuth())
    Promise.all([auth])
        .then(() => {
            dispatch(setInitialized());
        })
}

export default appReducer;