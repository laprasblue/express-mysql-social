const UserService = require('../services/User')
const RefreshTokenService = require('../services/RefreshToken')
const bcrypt = require('bcrypt')
const { createToken, isValid } = require('../utils/token')
const { tokenEnum } = require('../constants/token')
const jwt = require('jsonwebtoken')

module.exports.login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await UserService.findByEmail(email)
    if (!user) {
      return res.status(401).json({
        msg: 'email or password is invalid',
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({
        msg: 'email or password is invalid',
      })
    }

    const profileToken = { email: user.email, firstName: user.firstName, lastName: user.lastName }
    const token = await createToken({ ...profileToken, exp: tokenEnum.tokenExp })

    const refreshToken = await RefreshTokenService.findByUserId(user.userId)
    if (!refreshToken) {
      const newRefreshToken = await createToken({ ...profileToken, exp: tokenEnum.refreshTokenExp })
      await RefreshTokenService.createRefreshToken({
        userId: user.userId,
        refreshToken: newRefreshToken,
      })
      return res.status(200).json({
        msg: 'Login successfully!!!',
        token: token,
        refreshToken: newRefreshToken,
      })
    }

    if (!(await isValid(refreshToken.refreshToken))) {
      const newRefreshToken = await createToken({ ...profileToken, exp: tokenEnum.refreshTokenExp })
      await RefreshTokenService.UpdateByUserId(user.userId, newRefreshToken)
      return res.status(200).json({
        msg: 'Login successfully!!!',
        token: token,
        refreshToken: newRefreshToken,
      })
    }

    return res.status(200).json({
      msg: 'Login successfully!!!',
      token: token,
      refreshToken: refreshToken.refreshToken,
    })
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

module.exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body
  try {
    const decoded = await jwt.verify(refreshToken, tokenEnum.secret)
    const user = await UserService.findByEmail(decoded.email)
    if (!user) {
      return res.status(403).json({
        msg: 'invalid token',
      })
    }
    const token = await createToken({
      email: decoded.email,
      firstName: decoded.firstName,
      lastName: decoded.lastName,
      exp: tokenEnum.tokenExp,
    })
    res.json({
      token: token,
    })
  } catch (error) {
    console.log(error)
    return res.status(403).json({
      msg: 'invalid token',
    })
  }
}
