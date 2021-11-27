const express = require("express");
const cors = require("cors");
const app = express();
// const userRoutes = require("./routes/users");
// Middleware
app.use(cors());
app.use(express.json());

app.use(express.static("public"));

// Config
require("dotenv").config();
const port = process.env.PORT || 8080;

// app.use("/api/users", userRoutes)

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});

