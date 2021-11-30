const express = require("express");
const cors = require("cors");
const app = express();
const userRoutes = require("./routes/users");
const dbo = require("./db/conn");
const bp = require("body-parser");

// Middleware
app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(express.static("public"));

// Config
require("dotenv").config();
const port = process.env.PORT || 8080;

app.use("/api/v1/users", userRoutes);
app.use("*", (req,res) => res.status(404).json({error: "Not Found"}))

app.listen(port, () => {
  dbo.connectToServer(function (err) {
    if (err) console.error(err);

  });
  console.log(`Server is running on PORT ${port}`);
});

// export default app
