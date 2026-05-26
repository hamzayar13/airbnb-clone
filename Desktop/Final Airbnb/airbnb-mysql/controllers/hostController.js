const Home = require("../models/home");
const Booking = require("../models/booking");
const fs = require("fs");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
    editing: false,
    home: null,
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

exports.getEditHome = async (req, res, next) => {
  try {
    const homeId = req.params.homeId;
    const editing = req.query.editing === "true";
    const home = await Home.findById(homeId);

    if (!home) {
      return res.redirect("/host/host-home-list");
    }

    res.render("host/edit-home", {
      home,
      pageTitle: "Edit your Home",
      currentPage: "host-homes",
      editing,
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  } catch (err) {
    next(err);
  }
};

exports.getHostHomes = async (req, res, next) => {
  try {
    const registeredHomes = await Home.findAll();
    res.render("host/host-home-list", {
      registeredHomes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  } catch (err) {
    next(err);
  }
};

exports.postAddHome = async (req, res, next) => {
  try {
    const { houseName, price, location, rating, description } = req.body;
    const hostId = req.session.user.id;

    if (!req.file) {
      return res.status(422).send("No image provided");
    }

    const photo = req.file.path;
    await Home.create({
      houseName,
      price,
      location,
      rating,
      photo,
      description,
      hostId,
    });
    res.redirect("/host/host-home-list");
  } catch (err) {
    next(err);
  }
};

exports.postEditHome = async (req, res, next) => {
  try {
    const { id, houseName, price, location, rating, description } = req.body;
    const existingHome = await Home.findById(id);

    let newPhoto = null;
    if (req.file) {
      // Delete the old photo file if it exists
      if (existingHome && existingHome.photo) {
        fs.unlink(existingHome.photo, (err) => {
          if (err) console.log("Error deleting old photo:", err);
        });
      }
      newPhoto = req.file.path;
    }

    await Home.update(id, {
      houseName,
      price,
      location,
      rating,
      description,
      photo: newPhoto,
    });
    res.redirect("/host/host-home-list");
  } catch (err) {
    next(err);
  }
};

exports.postDeleteHome = async (req, res, next) => {
  try {
    const homeId = req.params.homeId;
    const home = await Home.deleteById(homeId);

    // Delete the photo file from disk if it exists
    if (home && home.photo) {
      fs.unlink(home.photo, (err) => {
        if (err) console.log("Error deleting photo:", err);
      });
    }

    res.redirect("/host/host-home-list");
  } catch (err) {
    next(err);
  }
};

exports.getReservations = async (req, res, next) => {
  try {
    const hostId = req.session.user.id;
    const reservations = await Booking.findByHostId(hostId);
    res.render("host/reservations", {
      reservations,
      pageTitle: "My Reservations",
      currentPage: "reservations",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  } catch (err) {
    next(err);
  }
};
