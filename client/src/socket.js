import io from "socket.io-client";
import store from "./store";
import { clearUnreadInDB } from "./store/utils/thunkCreators";
import {
	setNewMessage,
	removeOfflineUser,
	addOnlineUser,
	setUnreadMessages,
} from "./store/conversations";

const socket = io(window.location.origin);

socket.on("connect", () => {
	console.log("connected to server");

	socket.on("add-online-user", (id) => {
		store.dispatch(addOnlineUser(id));
	});

	socket.on("remove-offline-user", (id) => {
		store.dispatch(removeOfflineUser(id));
	});

	socket.on("new-message", async (data) => {
		store.dispatch(setNewMessage(data.message, data.sender));

    //check current active chat. If the current active chat is the sender, clear unread messages for that conversation in the DB, in the local store, and in the sender's store. Otherwise, set the new unread message count in the local store.
    if (store.getState().activeConversation.otherUserId === data.message.senderId) {
      clearUnreadInDB(data.message.conversationId);
      store.dispatch(setUnreadMessages(data.message.conversationId, 0));
      socket.emit("clear-unread", data.message.conversationId);
    } else {
      store.dispatch(setUnreadMessages(data.message.conversationId, data.unreadCount));
    }
	});

  socket.on("clear-unread", (data) => {
    console.log("recieved socket clear unread", store.getState());
    store.dispatch(setUnreadMessages(data, 0));
  });
});

export default socket;
