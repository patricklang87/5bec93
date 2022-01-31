import React, { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent, NewMessageCount } from "../Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { clearUnreadMsgs } from "../../store/utils/thunkCreators";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    width: 300,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab"
    }
  }
}));

const Chat = (props) => {
	const [sentLastMessage, setSetSentLastMessage] = useState(true);
	const classes = useStyles();
	const { conversation } = props;
	const { otherUser, messages } = conversation;

	useEffect(() => {
		const userSentLastMessage =
			otherUser.id !== messages[messages.length - 1]?.senderId;
		setSetSentLastMessage(userSentLastMessage);
	}, [messages, otherUser.id]);

	const handleClick = async (conversation) => {
		await props.setActiveChat({
			otherUserName: conversation.otherUser.username,
			otherUserId: conversation.otherUser.id,
		});

		//if the last message was sent by the other user, the message count will be cleared when the corresponding conversation is activated
		if (!sentLastMessage) {
			await props.clearUnreadMsgs(conversation.id);
		}
	};

	return (
		<Box onClick={() => handleClick(conversation)} className={classes.root}>
			<BadgeAvatar
				photoUrl={otherUser.photoUrl}
				username={otherUser.username}
				online={otherUser.online}
				sidebar={true}
			/>
			<ChatContent conversation={conversation} />
			{!sentLastMessage && conversation.unreadMsgs > 0 && (
				<NewMessageCount conversation={conversation} />
			)}
		</Box>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		setActiveChat: (id) => {
			dispatch(setActiveChat(id));
		},
		clearUnreadMsgs: (conversationId) => {
			dispatch(clearUnreadMsgs(conversationId));
		},
	};
};

export default connect(null, mapDispatchToProps)(Chat);
