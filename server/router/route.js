const express = require('express');
const router = express.Router();
const controller = require('../controller')

//routes relating to user account
router.route('/:id')
  .get(controller.users.getUser)

router.route('/signup')
  .post(controller.users.createUser)

router.route('/:id/contribution')
  .put(controller.users.updateContribution)

router.route('/:id/contribution')
  .put(controller.users.updatePhoto)

router.route('/:id/updateLocation')
  .put(controller.users.updateLocation)

router.route('/:id/updateNickname')
  .put(controller.users.updateNickname)

router.route('/:id/updatePrivacy')
.put(controller.users.updatePrivacy)

router.route('/:id/deleteUser')
.delete(controller.users.deleteUser)

// add and retrieve posts for default groups
router.route('/posts/defaultgroup')
  .get(controller.posts.getAllPosts)
  .post(controller.posts.addPost)

  // add and retrieve posts for user groups
router.route('/posts/usergroup')
  .get(controller.posts.getAllPostsUsers)
  .post(controller.posts.addPost)

router.route('/groups/default')
  .get(controller.groups.getDefaultGroup)
  .post(controller.groups.createDefaultGroup)

router.route('/groups/user')
  .get(controller.groups.getUserGroup)
  .post(controller.groups.createUserGroup)

//routes relating to replies of a post
router.route('/:post_id/replies')
  .get(controller.replies.getReplies)
  .post(controller.replies.postReply)

router.route('/:reply_id')
  .put(controller.replies.likeReply)
  .put(controller.replies.reportReply)
  .delete(controller.replies.deleteReply)

module.exports= router




