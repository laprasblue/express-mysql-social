const { RefreshToken } = require('../models/RefreshToken')

module.exports.createRefreshToken = async (profile) => {
  return await RefreshToken.create(profile)
}

module.exports.findByUserId = async (id) => {
  return await RefreshToken.findOne({
    where: {
      userId: id,
    },
  })
}

module.exports.UpdateByUserId = async (id, refreshToken) => {
  const result = await RefreshToken.findOne({
    where: {
      userId: id,
    },
  })
  result.set({
    refreshToken,
  })
  return await result.save()
}
