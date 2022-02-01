const Conversation = require("./conversation");
const ConvoMembership = require("./convoMembership");
const User = require("./user");
const Message = require("./message");

// associations

User.hasMany(ConvoMembership);
ConvoMembership.belongsTo(User, { as: "user" });
Conversation.hasMany(ConvoMembership);
ConvoMembership.belongsTo(Conversation, { as: "conversation"});
Message.belongsTo(Conversation);
Conversation.hasMany(Message);

module.exports = {
  User,
  Conversation,
  Message,
  ConvoMembership
};
