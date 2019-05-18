/* eslint-disable no-lone-blocks */
const ADD_MESSAGE = "ADD-MESSAGE";
const UPDATE_MESSAGE_TEXT = "UPDATE-MESSAGE-TEXT";

let initialState = {
  dialogsData: [
    { name: "user1", id: 1 },
    { name: "user2", id: 2 },
    { name: "user3", id: 3 },
    { name: "user4", id: 4 },
    { name: "user5", id: 5 }
  ],

  messagesData: [
    { id: 1, message: "message1" },
    { id: 2, message: "message2" },
    { id: 3, message: "message3" }
  ],
  newMessageText: ""
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      let newMessageText = state.newMessageText;
      return {
        ...state,
        messagesData: [
          ...state.messagesData,
          { id: state.messagesData.length, message: newMessageText }
        ],
        newMessageText: ""
      };
    case UPDATE_MESSAGE_TEXT:
      return {
        ...state,
        newMessageText: action.newText
      };
    default:
      return state;
  }
};

export const addMessage = () => ({
  type: ADD_MESSAGE
});
export const updateMessageText = text => ({
  type: UPDATE_MESSAGE_TEXT,
  newText: text
});

export default dialogsReducer;
