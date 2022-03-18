const { Router } = require('express')
const userRoute = require('./user')
const authRoute = require('./auth')
const postRoute = require('./post')
const projectRoute = require('./project')
const router = Router()

router.use('/user', userRoute)
router.use('/auth', authRoute)
router.use('/post', postRoute)
router.use('/project', projectRoute)

module.exports = router
