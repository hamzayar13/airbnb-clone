const Home = require("../models/home");
const User = require("../models/user");
const Booking = require("../models/booking");

exports.getIndex = async (req, res, next) => {
  try {
    const registeredHomes = await Home.findAll();
    res.render("store/home", {
      registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  } catch (err) {
    next(err);
  }
};

exports.getHomes = async (req, res, next) => {
  try {
    const registeredHomes = await Home.findAll();
    res.render("store/home", {
      registeredHomes,
      pageTitle: "Homes List",
      currentPage: "Home",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  } catch (err) {
    next(err);
  }
};

exports.getBookings = async (req, res, next) => {
  try {
    if (!req.isLoggedIn) {
      return res.redirect("/login");
    }
    const userId = req.session.user.id;
    const bookings = await Booking.findByGuestId(userId);
    res.render("store/bookings", {
      bookings,
      pageTitle: "My Bookings",
      currentPage: "bookings",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  } catch (err) {
    next(err);
  }
};

exports.getFavouriteList = async (req, res, next) => {
  try {
    const userId = req.session.user.id; // MySQL uses .id not ._id
    const favouriteHomes = await User.getFavourites(userId);
    res.render("store/favorite", {
      favouriteHomes,
      pageTitle: "My Favourites",
      currentPage: "favourites",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  } catch (err) {
    next(err);
  }
};

exports.postAddToFavourite = async (req, res, next) => {
  try {
    const homeId = req.body.id;
    const userId = req.session.user.id; // MySQL uses .id not ._id
    await User.addFavourite(userId, homeId);
    res.redirect("/favourites");
  } catch (err) {
    next(err);
  }
};

exports.postRemoveFromFavourite = async (req, res, next) => {
  try {
    const homeId = req.params.homeId;
    const userId = req.session.user.id; // MySQL uses .id not ._id
    await User.removeFavourite(userId, homeId);
    res.redirect("/favourites");
  } catch (err) {
    next(err);
  }
};

exports.getHomeDetails = async (req, res, next) => {
  try {
    const homeId = req.params.homeId;
    const home = await Home.findById(homeId);
    if (!home) {
      return res.redirect("/homes");
    }
    res.render("store/home-detail", {
      home,
      pageTitle: "Home Detail",
      currentPage: "Home",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  } catch (err) {
    next(err);
  }
};

exports.getBookingForm = async (req, res, next) => {
  try {
    const homeId = req.params.homeId;
    const home = await Home.findById(homeId);
    if (!home) {
      return res.redirect("/homes");
    }
    res.render("store/reserve", {
      home,
      pageTitle: "Book Property",
      currentPage: "booking",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  } catch (err) {
    next(err);
  }
};

exports.postBooking = async (req, res, next) => {
  try {
    if (!req.isLoggedIn) {
      return res.redirect("/login");
    }

    const { homeId, check_in_date, check_out_date } = req.body;
    const guestId = req.session.user.id;

    const home = await Home.findById(homeId);
    if (!home) {
      return res.status(404).send("Property not found");
    }

    // Calculate number of nights
    const checkIn = new Date(check_in_date);
    const checkOut = new Date(check_out_date);
    const nights = (checkOut - checkIn) / (1000 * 60 * 60 * 24);

    if (nights <= 0) {
      return res.status(400).send("Check-out date must be after check-in date");
    }

    const total_price = nights * home.price;

    await Booking.create({
      property_id: homeId,
      guest_id: guestId,
      check_in_date,
      check_out_date,
      total_price,
      status: 'confirmed',
    });

    res.redirect("/bookings");
  } catch (err) {
    next(err);
  }
};

exports.postCancelBooking = async (req, res, next) => {
  try {
    const bookingId = req.params.bookingId;
    await Booking.cancel(bookingId);
    res.redirect("/bookings");
  } catch (err) {
    next(err);
  }
};
