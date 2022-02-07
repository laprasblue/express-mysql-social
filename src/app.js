require('dotenv').config()
require('./utils/database')
const port = process.env.PORT || 5000
const express = require('express')
const app = express()
// test github
app.listen(port, () => console.log(`Server is running at ${port}`))
