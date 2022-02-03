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
    COALESCE((
      SELECT json_agg(network_id) as userPending FROM user_group_list
      JOIN user_groups ON user_group_list.user_group_id = user_groups.id
      WHERE accepted = false AND user_group_id = $1
    ), '[]') AS userPenging,
    g.name, g.city, g.state, g.zip,
    json_build_object('latitude', g.latitude, 'longitude', g.longitude) AS coordinates,
    g.photo, g.description,
    COALESCE((
      SELECT AVG("safety")::numeric(10,1)
      FROM groups_rating
      WHERE group_id = g.id
    ), 0) AS safety,
    COALESCE((
      SELECT AVG(friendliness)::numeric(10,1)
      FROM groups_rating
      WHERE group_id = g.id
    ), 0) AS friendiness,
    g.privacy
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
    const { name, network_id, city, state, zip, latitude, longitude, photo, description } = req.body;
    const privacy = req.body.privacy || false;
    const values = [ name, network_id, city, state, zip, latitude, longitude, privacy, photo, description];
    const createGroup = `INSERT INTO user_groups ("name", admin_id, city, "state", zip, latitude, longitude, privacy, photo, description)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING id;`;
    const addAdmin = `INSERT INTO user_group_list (network_id, user_group_id, accepted)
    VALUES ($1, $2, true);`;
    pool
      .query(createGroup, values)
      .then((results) => {
        const group_id = results.rows[0].id;
        pool
          .query(addAdmin, [network_id, group_id])
          .then(() => res.status(201).send('create a new group'))
          .catch((err) => res.status(500).send(err))
      })
      .catch(err => res.status(500).send(err))
  },
  joinGroup: (req, res) => {
    const { group_id} = req.params;
    const { network_id } = req.query;
    const accepted = req.query.accepted || false;
    const query = `INSERT INTO user_group_list (network_id, user_group_id, accepted)
    VALUES ($1, $2, $3)`;
    pool
      .query(query, [network_id, group_id, accepted])
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
    const query = `SELECT id, "name", city, "state", zip, photo,
    COALESCE((
      SELECT AVG("safety")::numeric(10,1)
         FROM groups_rating
         WHERE default_id = default_groups.id
    ),0) AS safety,
    COALESCE((
      SELECT AVG(friendliness)::numeric(10,1)
         FROM groups_rating
         WHERE default_id = default_groups.id
    ), 0) AS friendliness
    FROM default_groups WHERE id = $1;`;
    pool
      .query(query, [group_id])
      .then((results) => res.status(200).send(results.rows))
      .catch((err) => res.status(500).send(err))
  },
  getGroupsByLocation: (req, res) => {
    const { longitude, latitude, mi} = req.query;
    const r = parseFloat(mi/69) || parseFloat(0.07);
    const lat_min = parseInt(latitude) - r;
    const lat_max = parseInt(latitude) + r;
    const long_min = parseInt(longitude) - r;
    const long_max = parseInt(longitude) + r;
    const values = [lat_min, lat_max, long_min, long_max];
    const query = `SELECT g.id, g.name, g.admin_id, g.privacy, g.photo,
    COALESCE((
      SELECT AVG("safety")::numeric(10,1)
      FROM groups_rating
      WHERE group_id = g.id
    ),0) AS safety,
    COALESCE((
      SELECT AVG(friendliness)::numeric(10,1)
      FROM groups_rating
      WHERE group_id = g.id
    ),0) AS friendiness
    FROM user_groups g
    WHERE (latitude BETWEEN $1 AND $2) AND (longitude BETWEEN $3 AND $4)
    ORDER BY g.id;`
    pool
      .query(query, values)
      .then((results) => res.status(200).json(results.rows))
      .catch((err) => res.status(500).send(err))
  },
  changeImage: (req, res) => {
    const { group_id } = req.params;
    const { photo } = req.body;
    const query = `UPDATE user_groups SET photo = $1 WHERE id = $2;`;
    pool
      .query(query, [photo, group_id])
      .then(() => res.sendStatus(204))
      .catch((err) => res.status(500).send(err))
  },
  changePrivacy: (req, res) => {
    const { group_id } = req.params;
    const { privacy } = req.body;
    const query = `UPDATE user_groups SET privacy = $1 WHERE id = $2;`;
    pool
      .query(query, [privacy, group_id])
      .then(() => res.sendStatus(204))
      .catch((err) => res.status(500).send(err))
  },
  voteForRating: (req, res) => {
    const { group_id, default_group_id, network_id, safety, friendliness} = req.body;
    const values = [ group_id, default_group_id, network_id, safety, friendliness];
    const query = `INSERT INTO groups_rating (group_id, default_id, network_id, "safety", friendliness)
    VALUES ($1, $2, $3, $4, $5);`;
    pool
      .query(query, values)
      .then(() => res.sendStatus(201))
      .catch((err) => res.status(500).send(err))
  },
  editSafety: (req, res) => {
    const {group_id, default_group_id, network_id, safety } = req.body;
    if(group_id) {
      const query = `UPDATE groups_rating SET "safety" = $1 WHERE group_id = $2 AND network_id = $3;`;
      pool
        .query(query, [safety, group_id, network_id])
        .then(() => res.sendStatus(204))
        .catch((err) => res.status(500).send(err))
    } else if(default_group_id) {
      const query = `UPDATE groups_rating SET "safety" = $1 WHERE default_id = $2 AND network_id = $3;`;
      pool
        .query(query, [safety, default_group_id, network_id])
        .then(() => res.sendStatus(204))
        .catch((err) => res.status(500).send(err))
    }
  },
  editFriendliness: (req, res) => {
    const {group_id, default_group_id, network_id, friendliness } = req.body;
    if(group_id) {
      const query = `UPDATE groups_rating SET friendliness = $1 WHERE group_id = $2 AND network_id = $3;`;
      pool
        .query(query, [friendliness, group_id, network_id])
        .then(() => res.sendStatus(204))
        .catch((err) => res.status(500).send(err))
    } else if(default_group_id) {
      const query = `UPDATE groups_rating SET friendliness = $1 WHERE default_id = $2 AND network_id = $3;`;
      pool
        .query(query, [friendliness, default_group_id, network_id])
        .then(() => res.sendStatus(204))
        .catch((err) => res.status(500).send(err))
    }
  }
}