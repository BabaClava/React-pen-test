const ADD_MESSAGE = "ADD_MESSAGE";

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
  ]
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        ...state,
        messagesData: [
          ...state.messagesData,
          { id: state.messagesData.length, message: action.message }
        ],
        newMessageText: ""
      };
    default:
      return state;
  }
};

export const addMessage = (message) => ({
  type: ADD_MESSAGE,
  message
});

export default dialogsReducer;
