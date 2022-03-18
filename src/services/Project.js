const { Project } = require('../models/Project')

module.exports.findCreateByUserId = async (userId) => {
  return await Project.findAll({
    where: {
      userId,
    },
  })
}

module.exports.findByPK = async (projectId) => {
  return await Project.findByPk(projectId)
}

module.exports.createProject = async (project) => {
  return await Project.create(project)
}

module.exports.publicProject = async (projectId) => {
  const project = await Project.findByPk(projectId)
  project.set({
    isPublic: true,
  })
  return await project.save()
}
