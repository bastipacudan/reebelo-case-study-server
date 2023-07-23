const express = require('express')
const app = express()
const cors = require('cors')
const api = require('./api')
const PORT = process.env.PORT || 3000;

app.use(cors());

// setup api routes
app.use('/api', api)

app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`)
}) 