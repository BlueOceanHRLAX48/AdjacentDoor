const express = require('express');
const router = express.Router();
const controller = require('../controller/index.js');


router.route('/defaultgroup')
  .get(controller.posts.getAllPosts)
  .post(controller.posts.addPost)

module.exports= router;