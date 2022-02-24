const express = require('express')
const { body } = require('express-validator')
const authRoute = express.Router()
const { login, refreshToken } = require('../controllers/auth')
const { validateParams } = require('../middlewares/validateParams')

authRoute.post(
  '/login',
  body('email').isEmail().withMessage('Must be a valid e-mail express'),
  body('password').isLength({ min: 8 }).withMessage('Password must have at least 8 characters'),
  validateParams,
  login
)
authRoute.post('/refreshToken', refreshToken)
module.exports = authRoute
