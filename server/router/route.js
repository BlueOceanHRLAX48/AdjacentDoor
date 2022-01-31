const express = require('express');
const router = express.Router();
const db = require('../controller')

router.route('/:id')
  .get(db.users.getUser)

router.route('/signup/:zipcode')
  .get(db.users.createUser)

module.exports= router