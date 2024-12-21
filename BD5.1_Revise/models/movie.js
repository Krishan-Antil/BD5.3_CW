
let { DataTypes, sequelize } = require('../lib/');

let movie = sequelize.define('movie', {
  name: DataTypes.TEXT,
  genre: DataTypes.TEXT,
  release_year: DataTypes.INTEGER,
  artist: DataTypes.TEXT,
  album: DataTypes.TEXT,
  duration: DataTypes.INTEGER,
});

module.exports = {
  movie,
};
