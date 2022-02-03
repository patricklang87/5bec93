const SET_ACTIVE_CHAT = "SET_ACTIVE_CHAT";

export const setActiveChat = (payload) => {
  return {
    type: SET_ACTIVE_CHAT,
    username: payload.otherUserName,
    otherUserId: payload.otherUserId,
  };
};

const reducer = (state = { username: "", otherUserId: null }, action) => {
  switch (action.type) {
    case SET_ACTIVE_CHAT: {
      return { username: action.username, otherUserId: action.otherUserId };
    }
    default:
      return state;
  }
};

export default reducer;
