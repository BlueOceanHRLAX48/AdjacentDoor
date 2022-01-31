const express = require('express');
const router = express.Router();
const controller = require('../controller')

//routes relating to user account
router.route('/user/:id')
  .get(controller.users.getUser)

router.route('/user/signup')
  .post(controller.users.createUser)

router.route('/user/:id/contribution')
  .put(controller.users.updateContribution)

router.route('/user/:id/photo')
  .put(controller.users.updatePhoto)

router.route('/user/:id/updateLocation')
  .put(controller.users.updateLocation)

router.route('/user/:id/updateNickname')
  .put(controller.users.updateNickname)

router.route('/user/:id/updatePrivacy')
  .put(controller.users.updatePrivacy)

router.route('/user/:id/deleteUser')
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
router.route('posts/:post_id/replies')
  .get(controller.replies.getReplies)
  .post(controller.replies.postReply)

router.route('reply/:reply_id')
  .put(controller.replies.likeReply)
  .put(controller.replies.reportReply)
  .delete(controller.replies.deleteReply)

module.exports= router



