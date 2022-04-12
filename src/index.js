const express = require('express')

const app = express()

app.use(express.json())

app.get('/ping', (_, res) => {
  res.send()
})

module.exports = app
