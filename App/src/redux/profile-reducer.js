/* eslint-disable no-lone-blocks */
const ADD_POST = "ADD-POST";
const UPDATE_POST_TEXT = "UPDATE-POST-TEXT";

let initialState = {
  postsData: [
    { id: 1, post: "post 1", likesCount: 12 },
    { id: 2, post: "post 2", likesCount: 13 },
    { id: 3, post: "post 3", likesCount: 14 }
  ],
  newPostText: ""
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
    default:
      return state;
  }
};

export const addPost = () => ({
  type: ADD_POST
});
export const updatePostText = text => ({
  type: UPDATE_POST_TEXT,
  newText: text
});

export default profileReducer;
