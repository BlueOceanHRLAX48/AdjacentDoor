const express = require('express');
const router = express.Router();
const controller = require('../controller/index.js');

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

router.route('/groups/default')
  .get(controller.groups.getDefaultGroup)
  .post(controller.groups.createDefaultGroup)

router.route('/groups/user')
  .get(controller.groups.getUserGroup)
  .post(controller.groups.createUserGroup)


module.exports= router;