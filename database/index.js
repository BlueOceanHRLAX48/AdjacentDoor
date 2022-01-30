const { Pool } = require('pg');
require('dotenv').config()

const connection = {
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password:'',
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT
}

const pool = new Pool(connection);
pool.connect()
  .then(()=> console.log('connected to database'))
  .catch((err)=> console.err(err))


module.exports= pool;