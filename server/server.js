const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/users");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Config
require("dotenv").config();
const port = process.env.PORT || 8080;

app.use("/api/users", userRoutes)

// get driver connection
// const dbo = require("./db/conn");
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
    else (console.log("db connected"))
  });
  console.log(`Server is running on port: ${port}`);
});