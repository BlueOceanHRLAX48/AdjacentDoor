const pool = require('../../database/index.js');

const getDefaultGroup = (req, res) => {

};
const createDefaultGroup = (req, res) => {

};
const getUserGroup = (req, res) => {

};
const createUserGroup = (req, res) => {
  pool.query(`INSERT INTO user_groups ("name", admin_id, city, "state", zip, latitude, longitude, privacy, photo, "safety", friendliness)
  VALUES ('username', 1, 'city', 'CA', 91111, 121.11, -111.11, true, 'url', DEFAULT, DEFAULT);`)
}

module.exports = {
  getDefaultGroup,
  createDefaultGroup,
  getUserGroup,
  createUserGroup,
}