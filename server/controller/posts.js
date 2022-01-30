const pool = require('../../database/index.js');
const queries = require('./postsQueries.js');

const getAllPosts = (req, res) => {
  const { group_id } = req.query;
  pool
    .query(queries.getAllPosts, [group_id])
    .then((results) => res.json(results.rows))
    .catch((err) => console.error(err))
}

const addPost = (req, res) => {
  const {group_id, user_group_id, user_id, body, tag, latitude, longitude, photos } = req.body;
  const privacy = req.body.privacy || false;
  const values = [group_id, user_group_id, user_id, body, tag, privacy, latitude, longitude];
  pool
    .query(queries.addPost, values)
    .then((results) => {
      const post_id = results.rows[0].post_id;
      photos.forEach((url) => {
        pool
          .query(queries.addPostImage, [post_id, url])
          .then(() => console.log('succuess add image'))
      })
      res.status(201).send('success make a post')
    })
    .catch((err) => res.status(500).send(err))
}
module.exports = {
  getAllPosts,
  addPost
}