const pool = require('../../database')

module.exports = {
  getReplies: (req, res) => {
    let { post_id } = req.params

    let repliesStr =
    `select post_id, json_agg(json_build_object(
      'id', id, 'username', username,
      'body', reply, 'user_photo', (select profile_img from user_account
        where user_account.user_id = replies.user_id),
      (select json_build_object('latitude', replies.latitude, 'longitude', 'replies.longitude')
        as coordinates from replies),
        'like', like, 'report', report, 'time',time
    )) as replies from replies where post_id = $1`

    pool.query(repliesStr, [post_id])
        .then(result => res.status(200).json(result.rows))
  },

  postReply: (req, res) => {
    let { post_id } = req.params
    let replyParams = [
      post_id,
      req.body.user_id,
      req.body.username,
      req.body.latitude,
      req.body.longitude,
      req.body.reply,
      req.body.like,
      req.body.report
    ]

    let replyStr =
    `insert into replies(user_id, username, post_id, reply, report, like, time, latitude, longitude)
    values($1, $2, $3, $4, $5, $6, $7, $8)
    `
    pool.query(replyStr, replyParams)
      .then(result=> res.status(201).send('Comment has been posted'))
      .catch(err => res.status(500).send(err, 'Could not post comment'))
  },

  likeReply: (req, res) => {
    let { reply_id } = req.params

    let updateLike =
    `update replies set like = like + 1 where id = $1`

    pool.query(updateLike, [reply_id])
      .then(result => res.status(201).send('Comment Liked'))
      .catch(err => res.status(500).send('Could not like commend'))
  },

  reportReply: (req, res) => {
    let { reply_id } = req.params

    let updateReport =
    `update replies set report = not replies where id = $1`

    pool.query(updateReport, [reply_id])
      .then(result => res.status(201).send('Reported Comment'))
      .catch(err => res.status(500).send('Error reporting comment'))
  },

  deleteReply: (req, res) => {
    let { reply_id } = req.params

    let deleteStr =
    `delete replies where id= $1`

    pool.query(deleteStr, [reply_id])
      .then(result => res.status(201).send('Comment deleted'))
      .catch(err => res.status(500).send('Could not delete comment'))
  }
}