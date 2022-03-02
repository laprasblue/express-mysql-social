const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('social', 'root', 'password', {
  host: '127.0.0.1',
  port: 3306,
  dialect: 'mysql',
})
;(async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
    return
  } catch (error) {
    console.error('Unable to connect to the database!')
    console.error(error)
    process.exit(1)
  }
})()

sequelize.sync()

module.exports.sequelize = sequelize
