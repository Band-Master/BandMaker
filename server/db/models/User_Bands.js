const Sequelize = require("sequelize");
const db = require("../db");

const User_Bands = db.define("User_Bands");

module.exports = User_Bands;