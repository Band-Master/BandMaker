//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const ModelSong = require("./models/ModelSong");
const Band = require("./models/Band");
const Composition = require("./models/Composition");
const Song = require("./models/Song");
const Part = require("./models/Part");
const Tour = require("./models/Tour");
const Line = require("./models/Line");
const User_Bands = require("./models/User_Bands");

//associations

Band.belongsToMany(User, { through: User_Bands });
User.belongsToMany(Band, { through: User_Bands, as: "member" });

User.hasMany(ModelSong);

Band.hasMany(Song);
Song.belongsTo(Band);

Band.hasMany(Tour);
Tour.belongsTo(Band);

Song.hasMany(Part);
Part.belongsTo(Song);

User.hasMany(Part);
Part.belongsTo(User);

Band.hasMany(Part);
Part.belongsTo(Band);

module.exports = {
  db,
  models: {
    User,
    ModelSong,
    Band,
    Composition,
    Song,
    Part,
    Line,
    User_Bands,
    Tour
  },
};
