require('./config/config')

const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const createIssue = require('github-create-issue')
const githubUsername = require('github-username')

const port = process.env.PORT
const token = process.env.GH_TKN

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())

app.post('/api/issue', async (req, res) => {
  const opts = { token }

  try {
    const username = await githubUsername(req.body.username)

    createIssue(`${username}/cc_challenge`, req.body.title, opts, (error, issue, info) => {
      if (error) {
        res.status(500).send(error.message)
      }
      res.send(issue)
    })
  } catch (e) {
    res.status(500).send(e)
  }
})

app.listen(port, () => {
  console.log(`Started up at port ${port}`)
})

module.exports = { app }
