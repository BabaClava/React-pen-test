import { ProfileApi } from "../api";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';

let initialState = {
  postsData: [
    { id: 1, post: "post 1", likesCount: 12 },
    { id: 2, post: "post 2", likesCount: 13 },
    { id: 3, post: "post 3", likesCount: 14 }
  ],
  profile: null,
  status: ''
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      return {
        ...state,
        postsData: [
          ...state.postsData,
          {
            id: state.postsData.length,
            post: action.post,
            likesCount: 0
          }
        ]
      };
    }
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile
    }
    case SET_USER_STATUS:
      return {
        ...state,
        status: action.status
    }
    default:
      return state;
  }
};

//Action Creators
export const addPost = (post) => ({
  type: ADD_POST,
  post
});
export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile
});
export const setUserStatus = (status) => ({
  type: SET_USER_STATUS,
  status
});

//Thunks
export const getProfileData = id => {
  return dispatch => {
    ProfileApi.getProfile(id)
      .then(data => dispatch(setUserProfile(data)))
  }
}
export const getStatusData = id => {
  return dispatch => {
    ProfileApi.getStatus(id)
      .then(data => dispatch(setUserStatus(data)))
  }
}
export const updateStatus = status => {
  return dispatch => {
    ProfileApi.updateStatus(status)
      .then(data => {
        if(data.resultCode !== 1) dispatch(setUserStatus(status));
      })
  }
}

export default profileReducer;
