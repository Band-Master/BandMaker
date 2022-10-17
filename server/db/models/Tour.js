const Sequelize = require("sequelize");
const db = require("../db");

const Tour = db.define("tour", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Tour;