const { User } = require('../models/User')

module.exports.findByPk = async (userId) => {
  return await User.findByPk(userId)
}

module.exports.findByEmail = async (email) => {
  return await User.findOne({
    where: {
      email: email,
    },
  })
}
module.exports.findByPhone = async (phone) => {
  return await User.findOne({
    where: {
      phone: phone,
    },
  })
}
module.exports.createUser = async (user) => {
  return await User.create(user)
}
