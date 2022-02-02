const { Pool } = require('pg');
const config = require('../config')

const connection = {
  host: config.host || 'localhost',
  user: config.user,
  password: config.password,
  database: config.database || 'blueocean',
  port: config.port,
};

const pool = new Pool(connection);
pool
  .connect()
  .then(() => console.log('connected to database'))
  .catch((err) => console.error(err));

module.exports = pool;
