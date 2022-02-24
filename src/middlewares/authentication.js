const jwt = require('jsonwebtoken')
const { tokenEnum } = require('../constants/token')
const UserService = require('../services/User')
module.exports.getToken = (req, res, next) => {
  const authHeader = req.headers['authorization'] || ''
  const token = authHeader && authHeader.split(' ')[1]
  if (token === null || token === '') return res.sendStatus(401)
  req.token = token
  next()
}

module.exports.validateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'] || ''
  const token = authHeader && authHeader.split(' ')[1]
  if (token === null || token === '') return res.sendStatus(401)
  req.token = token

  try {
    const decoded = await jwt.verify(token, tokenEnum.secret)
    const user = await UserService.findByEmail(decoded.email)
    if (!user) {
      return res.status(403).json({
        msg: 'invalid token',
      })
    }
    req.profile = user
    next()
  } catch (error) {
    console.log(error)
    return res.sendStatus(403)
  }
}
