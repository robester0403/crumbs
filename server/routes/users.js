const express = require("express");
const router = express.Router();
const fs = require("fs");
// Middleware
router.use(express.json());
// Config
require("dotenv").config();
port = process.env.port;
/***********************
 * ADD NEW METHODS BELOW
 ***********************/
// router
//     .get()
//     .post()
//     etc
router.route("/").get((req, res) => {
  let restaurantsArr = fs.readFileSync("./data/vloggerdata.json");
  restaurantsArr = JSON.parse(restaurantsArr);
  return res.json(restaurantsArr.businesses);
});

module.exports = router;