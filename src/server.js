require('dotenv').config();

const express = require('express')
const app = express()
const cors = require('cors')
const api = require('./api')
const knex = require('../database/knex')
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()) 

// setup api routes
app.use('/api', api)
knex.migrate
      .latest()
      .then(() => {
        console.log('Migration Succeeded')
      }).catch(error => {
        console.log(error)
      })
app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`)
}) 