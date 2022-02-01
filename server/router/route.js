const express = require('express');
const router = express.Router();
const controller = require('../controller')

//routes relating to user account
router.route('/user/:id')
  .get(controller.users.getUser)

router.route('/user/signup')
  .post(controller.users.createUser)

router.route('/leaderboard')
  .get(controller.users.globalUserScore)

router.route('/leaderboard/:zip')
  .get(controller.users.localUserScore)

router.route('/leaderboard/user_group/:user_group_id')
  .get(controller.users.getLeaderBoardByUserGroup)

router.route('/:zip/users')
  .get(controller.users.getAllUsersBasedOnLocation)

router.route('/user_group/users/:user_group_id')
  .get(controller.users.getAllUsersBasedOnGroup)

router.route('/user/:id/contribution/add')
  .put(controller.users.incrementContribution)

router.route('/user/:id/contribution/subtract')
  .put(controller.users.decrementContribution)

router.route('/user/:id/photo')
  .put(controller.users.updatePhoto)

router.route('/user/:id/updateLocation')
  .put(controller.users.updateLocation)

router.route('/user/:id/displayName')
  .put(controller.users.displayName)

router.route('/user/:id/privacy')
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

router.route('/groups/user/:group_id/photo')
  .put(controller.groups.changeImage)

router.route('/groups/user/:group_id/privacy')
  .put(controller.groups.changePrivacy)

router.route('/groups/default/:group_id')
  .get(controller.groups.getDefaultGroup)

router.route('/groups/lists')
  .get(controller.groups.getGroupsByLocation)

//routes relating to replies of a post
router.route('/posts/:post_id/replies')
  .get(controller.replies.getReplies)
  .post(controller.replies.postReply)

router.route('/reply/:reply_id/like')
  .put(controller.replies.likeReply)

router.route('/reply/:reply_id/report')
  .put(controller.replies.reportReply)

router.route('/reply/:reply_id/delete')
  .delete(controller.replies.deleteReply)

module.exports= router




