const pool = require('../../database/index.js');

module.exports = {
  get: function(req, res) {
    pool.query('select * from user_account;')
      .then((result) => res.json(result.rows))
      .catch((err) => console.log(err))
  }
}