let sq = require('sequelize');

let sequelize = new sq.Sequelize(
  {
  dialect: 'sqlite',
  storage: './database1.sqlite',
});

module.exports = { DataTypes: sq.DataTypes, sequelize };
