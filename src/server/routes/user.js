const express = require('express');
const checkAuth = require('./../middleware/check-auth');

const router = express.Router();

const UserController = require('./../controllers/UserContoller');

router.post('/signup', UserController.sign_up_user);

router.post('/signin', UserController.sign_in_user);

router.get('/getuser', checkAuth, UserController.get_user);

module.exports = router;