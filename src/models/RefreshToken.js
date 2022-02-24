const { sequelize } = require('../utils/database')
const { DataTypes, Sequelize } = require('sequelize')
const { User } = require('./User')

const RefreshToken = sequelize.define('RefreshToken', {
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})
RefreshToken.belongsTo(User)

module.exports.RefreshToken = RefreshToken
