const Sequelize = require("sequelize");
const db = require("../db");

const Part = db.define("part", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Part;
