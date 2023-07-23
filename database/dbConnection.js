const { Pool } = require('pg')
const dbConfig = require('./dbConfig')

let mainPool = null;

const getConnectionPool = () => {
  if (mainPool) {
    return mainPool
  }

  const pool = new Pool({
    ...dbConfig,
    password: dbConfig.password,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 20000,
  })

  mainPool = pool

  return pool
}

module.exports = {
  getConnectionPool
}
