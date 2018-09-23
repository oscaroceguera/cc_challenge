const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 5000

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())

app.listen(port, () => {
  console.log(`Started up at port ${port}`)
})

module.exports = { app }
