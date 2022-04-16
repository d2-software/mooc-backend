const express = require('express')
const Router = require('express-promise-router')

const db = require('./config/db')
const routes = require('./routes/api')

const router = Router()

db.authenticate()
  .then((_) => {
    // console.log('DB initialized')
  })
  .catch((err) => {
    console.log(`Error on DB init: ${ err.message }`)
  })

const app = express()

app.use(express.json())

app.use(router)

router.use(routes)

module.exports = app
