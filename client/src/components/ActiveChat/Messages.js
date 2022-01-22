import React, { useMemo } from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
	const { messages, otherUser, userId } = props;

	const sortedMessages = useMemo(() => {
		return messages.sort((a, b) => {
			const dateA = new Date(a.createdAt);
			const dateB = new Date(b.createdAt);
			return dateA - dateB;
		});
	}, [messages]);

	return (
		<Box>
			{sortedMessages.map((message) => {
				const time = moment(message.createdAt).format("h:mm");

				return message.senderId === userId ? (
					<SenderBubble key={message.id} text={message.text} time={time} />
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
