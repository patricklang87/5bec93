import React, { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
	const { conversation, userId } = props;
  const { messages, otherUser, unreadMessages } = conversation;
  const [lastReadMsgIndex, setLastReadMsgIndex] = useState(messages.length - 1);

  useEffect(() => {
    setLastReadMsgIndex(messages.length - unreadMessages - 1);
  }, [messages, unreadMessages]);

	return (
		<Box>
			{messages.map((message, index) => {
				const time = moment(message.createdAt).format("h:mm");

				return message.senderId === userId ? (
					<SenderBubble
						key={message.id}
						text={message.text}
						time={time}
						msgIndex={index}
						lastReadMsgIndex={lastReadMsgIndex}
						otherUser={otherUser}
					/>
				) : (
					<OtherUserBubble
						key={message.id}
						text={message.text}
						time={time}
						otherUser={otherUser}
					/>
				);
			})}
		</Box>
	);
};

export default Messages;
