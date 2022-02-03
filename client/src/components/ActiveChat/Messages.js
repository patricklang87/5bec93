import React, { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
  const { conversation, userId } = props;
  const { messages, otherUser, unreadMessages } = conversation;
  const [readIndicatorIndex, setReadIndicatorIndex] = useState(
    messages.length - 1
  );

  useEffect(() => {
    // if the current user sent the last message, the read indcator will be placed on the last unread message. If the other user sent the last message, the program finds the last message sent by the current user and places the indicator on that message.
    const lastReadMessageIndex = messages.length - unreadMessages - 1;
    if (messages[lastReadMessageIndex]?.senderId === userId) {
      setReadIndicatorIndex(lastReadMessageIndex);
    } else {
      let currentMessageIndex = lastReadMessageIndex - 1;
      while (currentMessageIndex >= 0) {
        if (messages[currentMessageIndex].senderId !== userId) {
          currentMessageIndex--;
        } else {
          break;
        }
      }
      setReadIndicatorIndex(currentMessageIndex);
    }
  }, [messages, unreadMessages, userId]);

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
            readIndicatorIndex={readIndicatorIndex}
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
