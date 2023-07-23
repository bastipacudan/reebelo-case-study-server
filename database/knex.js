const path = require('path')
const dbConfig = require('./dbConfig')
module.exports = require('knex')({
  client: 'pg',
  connection: dbConfig,
  migrations: {
    directory: path.join(__dirname, "./migrations")
  }
 
})
