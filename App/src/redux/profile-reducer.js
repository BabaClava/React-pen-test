import { ProfileApi } from "../api";
import { stopSubmit } from 'redux-form';

const ADD_POST = "profile/ADD-POST";
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_USER_STATUS = 'profile/SET_USER_STATUS';
const SET_PROFILE_EDIT_MOD = 'profile/SET_PROFILE_EDIT_MOD';
const SET_AVATAR_EDIT_MOD = 'profile/SET_AVATAR_EDIT_MOD';
const SET_USER_PHOTO = 'profile/SET_USER_PHOTO';

let initialState = {
  postsData: [
    { id: 1, post: "post 1", likesCount: 12 },
    { id: 2, post: "post 2", likesCount: 13 },
    { id: 3, post: "post 3", likesCount: 14 }
  ],
  profile: null,
  status: '',
  profileEditMod: false,
  avatarEditMod: false
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
    case SET_PROFILE_EDIT_MOD:
      return {
        ...state,
        profileEditMod: action.value
    }
    case SET_AVATAR_EDIT_MOD:
      return {
        ...state,
        avatarEditMod: action.value
    }
    case SET_USER_PHOTO:
      return {
        ...state,
        profile: {
          ...state.profile,
          photos: action.photos
        }
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
export const editProfileToggler = (value) => ({
  type: SET_PROFILE_EDIT_MOD,
  value
});
export const editAvatarToggler = (value) => ({
  type: SET_AVATAR_EDIT_MOD,
  value
})
export const setUserPhoto = (photos) => ({
  type: SET_USER_PHOTO,
  photos
})

//Thunks
export const getProfileData = id => dispatch => {
    ProfileApi.getProfile(id)
      .then(data => dispatch(setUserProfile(data)))
}
export const updateProfile = profile => (dispatch, getState) => {
  const userId = getState().auth.userId;
    ProfileApi.updateProfile(profile)
      .then(data => {
        if (data.resultCode === 0) {
          dispatch(getProfileData(userId))
          dispatch(editProfileToggler(false))
        } else {
          dispatch(stopSubmit('profileEdit', {_error: data.messages[0] || 'some error'})); 
        }
      })
}
export const getStatusData = id => dispatch => {
    ProfileApi.getStatus(id)
      .then(data => dispatch(setUserStatus(data)))
  }
export const updateStatus = status => dispatch => {
    ProfileApi.updateStatus(status)
      .then(data => {
        if(data.resultCode !== 1) dispatch(setUserStatus(status));
      })
  }
export const updateAvatar = formData => dispatch => {
  ProfileApi.updateAvatar(formData)
    .then(data => {
      if(data.resultCode !== 1){
        dispatch(setUserPhoto(data.data.photos));
        dispatch(editAvatarToggler(false))
      }
    })
}
export default profileReducer;
