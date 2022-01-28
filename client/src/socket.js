import io from "socket.io-client";
import store from "./store";
import {
	setNewMessage,
	removeOfflineUser,
	addOnlineUser,
	setUnreadMsgs,
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

	socket.on("new-message", (data) => {
    console.log("socket new message received")
		store.dispatch(setNewMessage(data.message, data.sender));
    store.dispatch(setUnreadMsgs(data.message.conversationId, data.unreadCount));
	});

  socket.on("clear-unread", (data) => {
    console.log("recieved socket clear unread");
    store.dispatch(setUnreadMsgs(data, 0));
  });
});

export default socket;
