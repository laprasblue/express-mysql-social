const express = require('express')
const projectRoute = express.Router()
const { body } = require('express-validator')
const { validateParams } = require('../middlewares/validateParams.js')
const ProjectService = require('../services/Project')
const UserService = require('../services/User')
const { validateToken } = require('../middlewares/authentication.js')
const {
  createProject,
  getProjectByUserId,
  getProjectByProjectId,
  publishProject
} = require('../controllers/project')

projectRoute.post(
  '/',
  validateToken,
  body('projectName').isLength({ min: 4 }).withMessage('projectName must have min 4 characters'),
  body('authors').isArray().withMessage('authors must be array'),
  validateParams,
  createProject
)
.put('/:projectId/publish', validateToken, publishProject)
.get('/', validateToken, getProjectByUserId)
.get('/:projectId', validateToken, getProjectByProjectId)

module.exports = projectRoute
