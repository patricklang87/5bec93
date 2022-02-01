const { Sequelize } = require("sequelize");
const db = require("../db");

const ConvoMembership = db.define("convoMembership", {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  conversationId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  isCreator: {
    type: Sequelize.BOOLEAN,
    default: false,
    allowNull: false
  },
  unreadMessages: {
    type: Sequelize.INTEGER,
    default: 0,
    allowNull: false
  }
});

module.exports = ConvoMembership;