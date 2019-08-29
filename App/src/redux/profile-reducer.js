import { UserApi } from "../api";

/* eslint-disable no-lone-blocks */
const ADD_POST = "ADD-POST";
const UPDATE_POST_TEXT = "UPDATE-POST-TEXT";
const SET_USER_PROFILE = 'SET-USER-PROFILE';

let initialState = {
  postsData: [
    { id: 1, post: "post 1", likesCount: 12 },
    { id: 2, post: "post 2", likesCount: 13 },
    { id: 3, post: "post 3", likesCount: 14 }
  ],
  newPostText: "",
  profile: null
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let newPostText = state.newPostText;
      return {
        ...state,
        postsData: [
          ...state.postsData,
          {
            id: state.postsData.length,
            post: newPostText,
            likesCount: 0
          }
        ],
        newPostText: ""
      };
    }
    case UPDATE_POST_TEXT:
      return {
        ...state,
        newPostText: action.newText
      };
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile
    }
    default:
      return state;
  }
};

//Action Creators
export const addPost = () => ({
  type: ADD_POST
});
export const updatePostText = text => ({
  type: UPDATE_POST_TEXT,
  newText: text
});

export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile
})

//Thunks
export const getProfile = id => {
  return dispatch => {
    UserApi.getProfile(id)
      .then(data => dispatch(setUserProfile(data)))
  }
}

export default profileReducer;
