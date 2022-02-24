const jwt = require('jsonwebtoken')
const { tokenEnum } = require('../constants/token')
module.exports.createToken = async (profile) => {
  return await jwt.sign(
    { email: profile.email, firstName: profile.firstName, lastName: profile.lastName },
    tokenEnum.secret,
    { expiresIn: profile.exp }
  )
}

module.exports.isValid = async (token) => {
  try {
    await jwt.verify(token, tokenEnum.secret)
    return true
  } catch (error) {
    return false
  }
}
