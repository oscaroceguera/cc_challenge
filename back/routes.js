const express = require('express')
const router = express.Router()
const createIssue = require('github-create-issue')
const githubUsername = require('github-username')
const token = process.env.GH_TKN

module.exports = (app) => {
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

  router.get('/', (req, res) => {
    res.send({ message: 'hola!' })
  })

  app.use('/api', router)
}
