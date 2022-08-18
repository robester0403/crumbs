const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
const instanceMapRoutes = require("./routes/instance-map-routes");
const usersRoutes = require("./routes/users-routes");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();

require("dotenv").config();

mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Mongoose is connected"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors({ credentials: true, origin: true }));
app.use(logger("combined"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//
app.use(express.static(path.join(__dirname, "public")));

app.use(morgan("combined"));

// import routes
app.use("/api/instancemap", instanceMapRoutes);
app.use("/api/users", usersRoutes);

// Step 1:
// Step 2:

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "client", "build")));
  app.get("*", (_, response) => {
    response.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
