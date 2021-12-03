const express = require('express');
const { check } = require('express-validator');
const checkAuth = require('../middleware/check-auth');
const usersController = require('../controllers/users-controllers');

const router = express.Router();

// works now
router.get('/', usersController.getUsers);

// works now make sure you feed in json
router.post(
  '/signup',

  [
    check('name')
      .not()
      .isEmpty(),
    check('email')
      .normalizeEmail()
      .isEmail(),
    check('password').isLength({ min: 6 })
  ],

  usersController.signup
);


// works now make sure you use no caps
router.post('/login', usersController.login);

router.use(checkAuth);

router.get('/loggedin/:userId', usersController.influencerDashBoardGetData);

module.exports = router;
