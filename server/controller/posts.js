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

}
module.exports = {
  getAllPosts,
  addPost
  // getAllPosts: function(req, res) {
  //   pool
  //     .query('select * from posts;')
  //     .then((result) => res.json(result.rows))
  //     .catch((err) => console.log(err))
  // },
  // addPost: function(req, res) {
  //   //const { group_id, user_group_id } = req.query;
  //   // const group_id = req.query.group_id || NULL;
  //   // const user_group_id = req.query.user_group_id || NULL;
  //   // return console.log(req);
  //   //res.send('test');
  //   // pool
  //   //   .query(queries.addPost, values.post)
  //   //   .then()
  // }
}