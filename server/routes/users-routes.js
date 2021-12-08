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

router.post('/login', usersController.login);

router.use(checkAuth);

router.post('/loggedin/:userId/searchYelp', usersController.influencerSearchYelp)
router.get('/loggedin/:userId/profile', usersController.influencerDBGetProfile);
router.post('/loggedin/:userId/addmarkinst', usersController.influencerDBAddMarkerInstance);
router.get('/loggedin/:userId', usersController.influencerDBGetOwnInstances);

module.exports = router;