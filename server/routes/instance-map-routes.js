const express = require('express');
const { check } = require('express-validator');
const checkAuth = require('../middleware/check-auth');
const instanceMapController = require('../controllers/instance-map-controllers');

const router = express.Router();

// add checks later

// for getting instances to view on the public map. check again how routes deal with exact
router.get('/inst/all', instanceMapController.getAllInstances);
router.get('/marker/all', instanceMapController.getAllMapMarkers);
router.get('/inst/:bizid', instanceMapController.getBizIdInstances);


module.exports = router;