const path = require('path')

const dbConfig = { 
    user: process.env.DB_USERNAME,
    host: process.env.POSTGRES_HOST,
    database: process.env.DB_NAME,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.DB_PORT,
}
module.exports = require('knex')({
  client: 'pg',
  connection: dbConfig,
  migrations: {
    directory: path.join(__dirname, "./migrations")
  }
 
})
