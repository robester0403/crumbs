const express = require('express');
const { check } = require('express-validator');
const checkAuth = require('../middleware/check-auth');
const instanceMapController = require('../controllers/instance-map-controllers');

const router = express.Router();

router.get('/inst/all', instanceMapController.getAllInstances);
router.get('/marker/all', instanceMapController.getAllMapMarkers);
router.get('/inst/:bizId', instanceMapController.getBizIdInstances);

module.exports = router;