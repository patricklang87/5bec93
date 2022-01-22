const Sequelize = require("sequelize");
require("dotenv").config();

const { PG_USER, PG_PASSWORD, PG_HOST, PG_PORT, PG_DATABASE } = process.env;
const devString = `postgresql://${PG_USER}:${PG_PASSWORD}@${PG_HOST}:${PG_PORT}/${PG_DATABASE}`;

const db = new Sequelize(process.env.DATABASE_URL || devString, {
	logging: false,
});

module.exports = db;
