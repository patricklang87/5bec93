const router = require("express").Router();
const { User, Conversation, Message } = require("../../db/models");
const { Op } = require("sequelize");
const onlineUsers = require("../../onlineUsers");

// get all conversations for a user, include latest message text for preview, and all messages
// include other user model so we have info on username/profile pic (don't include current user info)
router.get("/", async (req, res, next) => {
<<<<<<< HEAD
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
=======
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
			attributes: ["id", "unreadMsgs"],
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
>>>>>>> parent of 90a1d52 (rename Msgs to Messages)

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
router.put("/incrementUnread/:convoId", async (req, res, next) => {
  const convoId = req.params.convoId;
	try {
		const updatedConversation = await Conversation.increment("unreadMsgs", {
			where: { id: convoId },
		});
		res.json(updatedConversation);
	} catch (error) {
		next(error);
	}
});

//Increment the "unread" value of a particular conversation
router.put("/clearUnread/:convoId", async (req, res, next) => {
  const convoId = req.params.convoId;
	try {
		const updatedConversation = await Conversation.update(
			{
				unreadMsgs: 0,
			},
			{
				where: { id: convoId },
        return: true
			}
		);
		res.json(updatedConversation);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
