const { makeQuery } = require('../src/util/queryMaker')
const { getConnectionPool } = require('./dbConnection');

function query (type, ...values) {
  return queryWithConnection(type, getConnectionPool(), values)
}

function queryWithConnection (queryAction, pool, values) {
  return new Promise((resolve, reject) => {
    try {
      const { query, valueComponents } = makeQuery(queryAction, values)
      
      pool
        .connect()
        .then(client => {
          return client
            .query(query, valueComponents ? valueComponents : null)
            .then(res => {
              client.release()
              return resolve(res.rows)
            })
            .catch(err => {
              client.release()
              return reject(err)
            })
        })
        .catch(err => {
          return reject(err)
        })
    } catch (error) {
      return reject(error)
    }
  })
} 

module.exports = {
  query
}
