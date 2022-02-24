require('dotenv').config()
require('./utils/database')

const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const port = process.env.PORT || 5000
const express = require('express')
const router = require('./routes')
const app = express()
app.use(helmet())
app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
app.use('/api/v1', router)

app.listen(port, () => console.log(`Server is running at ${port}`))
