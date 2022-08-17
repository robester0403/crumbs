const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
const instanceMapRoutes = require("./routes/instance-map-routes");
const usersRoutes = require("./routes/users-routes");
const morgan = require("morgan");

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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use(morgan("combined"));
app.use("/api/instancemap", instanceMapRoutes);
app.use("/api/users", usersRoutes);

if (process.env.NODE_ENV === "production") {
  app.get("*", (_, response) => {
    response.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(process.env.PORT || 5000, console.log(`Connected to Port ${PORT}`));
