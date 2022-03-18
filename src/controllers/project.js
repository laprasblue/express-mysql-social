const ProjectService = require('../services/Project')
const UserService = require('../services/User')

module.exports.createProject = async (req, res) => {
  const { projectName, authors } = req.body
  try {
    const data = await Promise.all(
      authors.map(async (author) => {
        return await UserService.findByPk(author)
      })
    )
    if (data.includes(null)) {
      return res.sendStatus(400)
    }
    const project = await ProjectService.createProject({
      userId: req.profile.userId,
      projectName,
      authors,
      followers: [],
      distributions: [],
    })
    res.status(201).json({
      msg: 'Created Project',
      project,
    })
  } catch (error) {
    console.log(error)
    return res.sendStatus(503)
  }
}

module.exports.publishProject = async (req, res) => {
  try {
    const project = await ProjectService.findByPK(req.params.projectId)
    if (project.isPublic) {
      return res.status(400).json({
        msg: `Project ${project.projectId} is publishing...`
      })
    }
    if (project.userId == req.profile.userId) {
      await ProjectService.publishProject(req.params.projectId)
      return res.json({
        msg: `Published project ${project.projectId}`
      })
    } else {
      return res.status(400).json({
        msg: "You have not permission to publish"
      })
    }
  } catch (error) {
    console.log(error)
    return res.sendStatus(503)
  }
}

module.exports.getProjectByUserId = async (req, res) => {
  try {
    const projects = await ProjectService.findCreatedByUserId(req.profile.userId)
    res.json(projects)
  } catch (error) {
    console.log(error)
    return res.sendStatus(503)
  }
}

module.exports.getProjectByProjectId = async (req, res) => {
  try {
    const project = await ProjectService.findByPK(req.params.projectId)
    if (project.userId == req.profile.userId) {
      return res.json(project)
    } else {
      res.sendStatus(400)
    }
  } catch (error) {
    console.log(error)
    return res.sendStatus(503)
  }
}

