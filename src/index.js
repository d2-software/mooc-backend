const express = require('express')

const db = require('./config/db')

db.authenticate()
  .then((_) => {
    console.log('DB initialized')
  })
  .catch((err) => {
    console.log(`Error on DB init: ${ err.message }`)
  })

const app = express()

app.use(express.json())

app.get('/ping', (_, res) => {
  res.send()
})

module.exports = app
