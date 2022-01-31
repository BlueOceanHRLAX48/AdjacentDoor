const express = require('express');
const router = express.Router();
const db = require('../controller')

//routes relating to user account
router.route('/:id')
  .get(db.users.getUser)

router.route('/signup')
  .post(db.users.createUser)

router.route('/:id/contribution')
  .put(db.users.updateContribution)

router.route('/:id/contribution')
  .put(db.users.updatePhoto)

router.route('/:id/updateLocation')
  .put(db.users.updateLocation)

router.route('/:id/updateNickname')
  .put(db.users.updateNickname)

router.route('/:id/updatePrivacy')
  .put(db.users.updatePrivacy)

router.route('/:id/deleteUser')
  .delete(db.users.deleteUser)

//routes relating to replies of a post
router.route('/:post_id/replies')
  .get(db.replies.getReplies)
  .post(db.replies.postReply)

router.route('/:reply_id')
  .put(db.replies.likeReply)
  .put(db.replies.reportReply)
  .delete(db.replies.deleteReply)

module.exports= router