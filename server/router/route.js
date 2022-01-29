const express = require('express');
const router = express.Router();
const db = require('../controller')

router.route('/dummy')
  .get(db.users.get)

module.exports= router