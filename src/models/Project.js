const { sequelize } = require('../utils/database')
const { DataTypes, Sequelize } = require('sequelize')

const Project = sequelize.define('Project', {
  projectId: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  projectName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  followers: {
    type: DataTypes.STRING,
    allowNull: false,
    get() {
      return this.getDataValue('followers').split(';')
    },
    set(value) {
      this.setDataValue('followers', value.join(';'))
    },
  },
  star: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  authors: {
    type: DataTypes.STRING,
    allowNull: false,
    get() {
      return this.getDataValue('authors').split(';')
    },
    set(value) {
      this.setDataValue('authors', value.join(';'))
    },
  },
  distributions: {
    type: DataTypes.STRING,
    allowNull: false,
    get() {
      return this.getDataValue('distributions').split(';')
    },
    set(value) {
      this.setDataValue('distributions', value.join(';'))
    },
  },
  isPublic: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
})

module.exports.Project = Project
