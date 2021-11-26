const express = require("express");
const router = express.Router();
// const fs = require("fs");
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

  return res.json(console.log("connected"));
});