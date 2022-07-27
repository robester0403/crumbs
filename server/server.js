const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const instanceMapRoutes = require("./routes/instance-map-routes");
const usersRoutes = require("./routes/users-routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/uploads/images", express.static(path.join("uploads", "images")));

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

require("dotenv").config();
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.ATLAS_URI) // may need a fallback DB?
  .catch((err) => {
    console.log(err);
  });

if (process.env.NODE_ENV === "production") {
}

app.listen(PORT, console.log(`Connected to Port ${PORT}`));
