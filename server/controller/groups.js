const pool = require('../../database/index.js');

module.exports = {
  getUserGroup: (req, res) => {
    const { group_id } = req.query;
    const query = `SELECT g.id, g.admin_id,
    (
      SELECT json_agg(network_id) as userJoined FROM user_group_list
      JOIN user_groups ON user_group_list.user_group_id = user_groups.id
      WHERE accepted = true AND user_group_id = $1
    ),
    (
      SELECT json_agg(network_id) as userPending FROM user_group_list
      JOIN user_groups ON user_group_list.user_group_id = user_groups.id
      WHERE accepted = false AND user_group_id = $1
    ),
    g.name, g.city, g.state, g.zip,
    json_build_object('latitude', g.latitude, 'longitude', g.longitude) AS coordinates,
    g.photo, g.safety, g.friendliness, g.privacy
    FROM user_groups g
    WHERE id=$1;`;
    pool
      .query(query, [group_id])
      .then((results) => {
        res.status(201).json(results.rows)
      })
      .catch((err) => res.status(500).send(err))
  },
  createUserGroup: (req, res) => {
    const { name, network_id, address, city, state, zip, latitude, longitude, photo } = req.body;
    const privacy = req.body.privacy || false;
    const values = [ name, network_id, address, city, state, zip, latitude, longitude, privacy, photo];
    const createGroup = `INSERT INTO user_groups ("name", admin_id, address, city, "state", zip, latitude, longitude, privacy, photo, "safety", friendliness)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, DEFAULT, DEFAULT)
    RETURNING id;`;
    const addAdmin = `INSERT INTO user_group_list (network_id, user_group_id, accepted)
    VALUES ($1, $2, true);`;
    pool
      .query(createGroup, values)
      .then((results) => {
        const group_id = results.rows[0].id;
        console.log(results.rows[0].id);
        if(group_id) {
          pool
            .query(addAdmin, [network_id, group_id])
            .then(() => res.status(201).send('create a new group'))
        }
      })
      .catch(err => res.status(500).send(err))
  },
  joinGroup: (req, res) => {
    const { group_id} = req.params;
    const { network_id } = req.query;
    const query = `INSERT INTO user_group_list (network_id, user_group_id, accepted)
    VALUES ($1, $2, DEFAULT)`;
    pool
      .query(query, [network_id, group_id])
      .then(() => res.status(201).send('send request to join group'))
      .catch(err => res.status(500).send(err))
  },
  acceptJoinRequest: (req, res) => {
    const { group_id } = req.params;
    const { network_id } = req.query;
    const query = `UPDATE user_group_list SET accepted = true
    WHERE network_id = $1 AND user_group_id = $2;`;
    pool
      .query(query, [network_id, group_id])
      .then(() => res.sendStatus(204))
      .catch((err) => res.status(500).send(err))
  },
  leftUserGroup: (req, res) => {
    const { group_id } = req.params;
    const { network_id } = req.query;
    const query = `DELETE FROM user_group_list WHERE network_id = $1 AND user_group_id = $2;`;
    pool
      .query(query, [network_id, group_id])
      .then(() => res.sendStatus(202))
      .catch((err) => res.status(500).send(err))
  },
  getDefaultGroup: (req, res) => {
    const { group_id } = req.params;
    const query = `SELECT * FROM default_groups WHERE id = $1`;
    pool
      .query(query, [group_id])
      .then((results) => res.status(200).send(results.rows))
      .catch((err) => res.status(500).send(err))
  },
  getGroupsByLocation: (req, res) => {
    const { longitude, latitude, r } = req.query;
    const lat_min = parseInt(latitude) - parseInt(r);
    const lat_max = parseInt(latitude) + parseInt(r);
    const long_min = parseInt(longitude) - parseInt(r);
    const long_max = parseInt(longitude) + parseInt(r);
    const values = [lat_min, lat_max, long_min, long_max];
    const query = `SELECT g.id, g.name, g.privacy, g.photo, g.safety, g.friendliness
    FROM user_groups g
    WHERE (latitude BETWEEN $1 AND $2) AND (longitude BETWEEN $3 AND $4);`;
    pool
      .query(query, values)
      .then((results) => res.status(200).json(results.rows))
      .catch((err) => res.status(500).send(err))
  }
}