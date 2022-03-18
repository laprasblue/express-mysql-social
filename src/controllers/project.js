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

module.exports.publicProject = async (req, res) => {
  const { projectId } = req.body
  try {
    await ProjectService.publicProject(projectId)
  } catch (error) {
    console.log(error)
    return res.sendStatus(503)
  }
}

module.exports.getProjectByUserId = async (req, res) => {
  res.sendStatus(200)
}
module.exports.getProjectByProjectId = async (req, res) => {
  res.sendStatus(200)
}
