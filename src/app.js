require('dotenv').config()
require('./utils/database')
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'b',
      description: 'Test api',
      version: '1.0.0',
      contact: {
        name: 'Huynh Hoang',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [`${__dirname}/utils/swagger.js`],
}

const specs = swaggerJsdoc(options)

const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const port = process.env.PORT || 5000
const express = require('express')
const router = require('./routes')
const app = express()
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
app.use(helmet())
app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
app.use('/api/v1', router)

app.listen(port, () => console.log(`Server is running at ${port}`))
