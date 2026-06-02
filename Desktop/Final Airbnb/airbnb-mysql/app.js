require("dotenv").config();

// Core Module
const path = require("path");

// External Modules
const express = require("express");
const session = require("express-session");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Local Modules
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const authRouter = require("./routes/authRouter");
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");

const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

// Multer setup for image uploads
const randomString = (length) => {
  const characters = "abcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "airbnb-homes",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, JPEG, and PNG files are allowed"));
  }
};

app.use(express.urlencoded({ extended: false }));
app.use(multer({ storage, fileFilter }).single("photo"));
app.use(express.static(path.join(rootDir, "public")));
app.use("/uploads", express.static(path.join(rootDir, "uploads")));
app.use("/host/uploads", express.static(path.join(rootDir, "uploads")));
app.use("/homes/uploads", express.static(path.join(rootDir, "uploads")));

// Session
app.use(
  session({
    secret: "airbnb-mysql-secret-key",
    resave: false,
    saveUninitialized: false,
  }),
);

app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn;
  next();
});

app.use(authRouter);
app.use(storeRouter);
app.use("/host", (req, res, next) => {
  if (req.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
});
app.use("/host", hostRouter);

app.use(errorsController.pageNotFound);

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
