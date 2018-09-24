require('./config/config')

const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

const port = process.env.PORT

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())

const routes = require('./routes')

routes(app)

app.listen(port, () => {
  console.log(`Started up at port ${port}`)
})

module.exports = { app }
