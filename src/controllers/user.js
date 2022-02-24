const UserService = require('../services/User')
const RefreshService = require('../services/RefreshToken')
const bcrypt = require('bcrypt')
const { createToken } = require('../utils/token')
const { tokenEnum } = require('../constants/token')

module.exports.createUser = async (req, res) => {
  const { email, password, firstName, lastName, phone } = req.body

  try {
    const token = await createToken({ email, firstName, lastName, exp: tokenEnum.tokenExp })
    const refreshToken = await createToken({
      email,
      firstName,
      lastName,
      exp: tokenEnum.refreshTokenExp,
    })

    const hashPassword = await bcrypt.hash(password, 10)

    const user = await UserService.createUser({
      email,
      password: hashPassword,
      firstName,
      lastName,
      phone,
    })

    await RefreshService.createRefreshToken({ userId: user.userId, refreshToken })
    res.status(201).json({
      msg: 'Created User',
      token: token,
      refreshToken: refreshToken,
    })
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}
