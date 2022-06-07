const Sequelize = require("sequelize");
const db = require("../db");

const Band = db.define("band", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  bio: {
    type: Sequelize.STRING,
  },
});

module.exports = Band;
