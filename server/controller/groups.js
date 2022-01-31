const pool = require('../../database/index.js');


const getUserGroup = (req, res) => {

};

module.exports = {
  getUserGroup,
  createUserGroup: (req, res) => {
    const { name, user_id, city, state, zip, latitude, longitude, photo } = req.body;
    const privacy = req.body.privacy || false;
    const values = [ name, user_id, city, state, zip, latitude, longitude, privacy, photo];
    pool
      .query(`INSERT INTO user_groups ("name", admin_id, city, "state", zip, latitude, longitude, privacy, photo, "safety", friendliness)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, DEFAULT, DEFAULT);`, values)
      .then(() => res.status(201).send('create a new group'))
      .catch(err => res.status(500).send(err))
  },
}