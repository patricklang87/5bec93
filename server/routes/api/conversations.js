const router = require("express").Router();
const { User, Conversation, Message } = require("../../db/models");
const { Op } = require("sequelize");
const onlineUsers = require("../../onlineUsers");

// get all conversations for a user, include latest message text for preview, and all messages
// include other user model so we have info on username/profile pic (don't include current user info)
router.get("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const userId = req.user.id;
    const conversations = await Conversation.findAll({
      where: {
        [Op.or]: {
          user1Id: userId,
          user2Id: userId,
        },
      },
      attributes: ["id", "unreadMessages"],
      order: [[Message, "createdAt", "ASC"]],
      include: [
        { model: Message, order: ["createdAt", "ASC"] },
        {
          model: User,
          as: "user1",
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ["id", "username", "photoUrl"],
          required: false,
        },
        {
          model: User,
          as: "user2",
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ["id", "username", "photoUrl"],
          required: false,
        },
      ],
    });

    for (let i = 0; i < conversations.length; i++) {
      const convo = conversations[i];
      const convoJSON = convo.toJSON();

      // set a property "otherUser" so that frontend will have easier access
      if (convoJSON.user1) {
        convoJSON.otherUser = convoJSON.user1;
        delete convoJSON.user1;
      } else if (convoJSON.user2) {
        convoJSON.otherUser = convoJSON.user2;
        delete convoJSON.user2;
      }

      // set property for online status of the other user
      if (onlineUsers.includes(convoJSON.otherUser.id)) {
        convoJSON.otherUser.online = true;
      } else {
        convoJSON.otherUser.online = false;
      }

      // set properties for notification count and latest message preview
      const latestMessageIndex = convoJSON.messages.length - 1;
      convoJSON.latestMessageText = convoJSON.messages[latestMessageIndex].text;
      conversations[i] = convoJSON;
    }

    res.json(conversations);
  } catch (error) {
    next(error);
  }
});

//Increment the "unread" value of a particular conversation
router.put("/:convoId/unread", async (req, res, next) => {
  if (!req.user) {
    return res.sendStatus(401);
  }

  const convoId = req.params.convoId;
  try {
    // confirm user is authorized to update these values
    const conversation = await Conversation.findOne({ where: { id: convoId } });
    const { dataValues } = conversation;
    if (
      req.user.id !== dataValues.user1Id &&
      req.user.id !== dataValues.user2Id
    ) {
      return res.sendStatus(403);
    }

    //If authorized, increment the unread messages
    const updatedConversation = await Conversation.increment("unreadMessages", {
      where: { id: convoId },
    });

    const [[[updatedConvo]]] = updatedConversation;
    const { unreadMessages } = updatedConvo;

    res.json(unreadMessages);
  } catch (error) {
    next(error);
  }
});

//Clear the "unread" value of a particular conversation
router.put("/:convoId/read", async (req, res, next) => {
  if (!req.user) {
    return res.sendStatus(401);
  }

  const convoId = req.params.convoId;
  try {
    // confirm user is authorized to update these values
    const conversation = await Conversation.findOne({ where: { id: convoId } });
    const { dataValues } = conversation;
    if (
      req.user.id !== dataValues.user1Id &&
      req.user.id !== dataValues.user2Id
    ) {
      return res.sendStatus(403);
    }

    //If user is authorized, update values
    await Conversation.update(
      {
        unreadMessages: 0,
      },
      {
        where: { id: convoId },
      }
    );
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
