let { DataTypes, sequelize } = require('../lib');

let tracks = sequelize.define('tracks', {
  name: DataTypes.TEXT,
  genre: DataTypes.TEXT,
  release_year: DataTypes.INTEGER,
  artist: DataTypes.TEXT,
  album: DataTypes.TEXT,
  duration: DataTypes.INTEGER,
});

module.exports = {
  tracks,
};
