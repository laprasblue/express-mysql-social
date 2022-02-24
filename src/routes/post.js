const express = require('express')
const { body } = require('express-validator')
const { validateToken } = require('../middlewares/authentication')
const postRoute = express.Router()

postRoute.get('/', validateToken, (req, res) => {
  res.sendStatus(200)
})

module.exports = postRoute
