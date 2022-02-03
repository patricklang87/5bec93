const { Sequelize } = require("sequelize");
const db = require("../db");


const Conversation = db.define("conversation", {
  name: {
    type: Sequelize.STRING
  }
});

module.exports = Conversation;
