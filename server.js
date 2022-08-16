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

// refactor this into a new file
require("dotenv").config();

mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }) // may need a fallback DB?
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

// app.use((error, req, res, next) => {
//   if (req.file) {
//     fs.unlink(req.file.path, (err) => {
//       console.log(err);
//     });
//   }
//   if (res.headerSent) {
//     return next(error);
//   }
//   res.status(error.code || 500);
//   res.json({ message: error.message || "An unknown error occurred!" });
// });

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(_dirname, "/client/build")));
}

app.listen(process.env.PORT || 5000, console.log(`Connected to Port ${PORT}`));
