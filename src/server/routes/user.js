const express = require('express');

const router = express.Router();

const UserController = require('./../controllers/UserContoller');

router.post('/signup', UserController.sign_up_user);

router.post('/signin', UserController.sign_in_user);

module.exports = router;