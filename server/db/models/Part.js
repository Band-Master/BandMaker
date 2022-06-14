const Sequelize = require("sequelize");
const db = require("../db");

const Part = db.define("part", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  audioUrl: Sequelize.STRING,
});

module.exports = Part;
