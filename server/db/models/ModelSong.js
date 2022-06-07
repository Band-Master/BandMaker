const Sequelize = require("sequelize");
const db = require("../db");

const ModelSong = db.define("modelSong", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lyrics: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  url: {
    type: Sequelize.STRING,
    isUrl: true,
  },
});

module.exports = ModelSong;
