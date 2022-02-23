require('dotenv').config()
require('./utils/database')
const { User } = require('./models/User')

const port = process.env.PORT || 5000
const express = require('express')
const app = express()
app.use(express.json())
// app.get('/', async (req, res) => {
//   try {
//     await User.sync({ alter: true })
//     res.json({
//       data: await User.findAll({}),
//     })
//   } catch (error) {
//     res.sendStatus(400)
//   }
// })

// app.get('/', async (req, res) => {
//   try {
//     await User.sync()
//     await User.create({
//       firstName: 'hello',
//       email: 'hello',
//       password: 'hello',
//       phone: 'hello',
//       lastName: 'hello',
//     })
//     res.json({
//       data: await User.findAll({}),
//     })
//   } catch (error) {
//     console.log(error)
//     res.sendStatus(400)
//   }
// })

app.get('/findOne', async (req, res) => {
  try {
    await User.update({ firstName: 'data' }, { where: { userId: 1 } })
    res.json({
      data: await User.findAll({}),
    })
  } catch (error) {
    console.log(error)
    res.sendStatus(400)
  }
})
app.listen(port, () => console.log(`Server is running at ${port}`))
