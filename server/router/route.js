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

router.route('/posts/like/:post_id')
  .put(controller.posts.likePost)

router.route('/posts/report/:post_id')
  .put(controller.posts.reportPost)

router.route('/posts/delete/:post_id')
  .delete(controller.posts.deletePost)

// route for user group
router.route('/groups/user')
  .get(controller.groups.getUserGroup)
  .post(controller.groups.createUserGroup)

router.route('/groups/user/:group_id/join')
  .post(controller.groups.joinGroup)

router.route('/groups/user/:group_id/accept')
  .put(controller.groups.acceptJoinRequest)

router.route('/groups/user/:group_id/left')
  .delete(controller.groups.leftUserGroup)

router.route('/groups/default/:group_id')
  .get(controller.groups.getDefaultGroup)

//routes relating to replies of a post
router.route('posts/:post_id/replies')
  .get(controller.replies.getReplies)
  .post(controller.replies.postReply)

router.route('reply/:reply_id')
  .put(controller.replies.likeReply)
  .put(controller.replies.reportReply)
  .delete(controller.replies.deleteReply)

module.exports= router




