const express = require('express');
const { check } = require('express-validator');
const checkAuth = require('../middleware/check-auth');
const usersController = require('../controllers/users-controllers');

const router = express.Router();

router.get('/', usersController.getUsers);

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

// router.get('/loggedin/:userId', usersController.influencerDashBoardGetData);
// do this route later might need a patch
// router.post('/loggedin/:userId/userprofile', usersControllers.editOwnProfile);

module.exports = router;