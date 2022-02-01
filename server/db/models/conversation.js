const { Op, Sequelize } = require("sequelize");
const db = require("../db");
const Message = require("./message");


const Conversation = db.define("conversation", {
  name: {
    type: Sequelize.STRING
  }
});

// find conversation based on conversation id

Conversation.findConversation = async function (conversationId) {
  const conversation = await Conversation.findOne({
    where: {
      conversationId: id
    }
  });

  // return conversation or null if it doesn't exist
  return conversation;
};

module.exports = Conversation;
