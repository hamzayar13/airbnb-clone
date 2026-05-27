// External Module
const express = require("express");
const storeRouter = express.Router();

// Local Module
const storeController = require("../controllers/storeController");

storeRouter.get("/", (req, res, next) => {
  // Redirect unauthenticated users to login page
  if (!req.isLoggedIn) {
    return res.redirect("/login");
  }
  next();
}, storeController.getIndex);
storeRouter.get("/homes", storeController.getHomes);
storeRouter.get("/bookings", storeController.getBookings);
storeRouter.get("/favourites", storeController.getFavouriteList);

storeRouter.get("/homes/:homeId", storeController.getHomeDetails);
storeRouter.get("/reserve/:homeId", storeController.getBookingForm);
storeRouter.post("/reserve", storeController.postBooking);
storeRouter.post(
  "/cancel-booking/:bookingId",
  storeController.postCancelBooking,
);

storeRouter.post("/favourites", storeController.postAddToFavourite);
storeRouter.post(
  "/favourites/delete/:homeId",
  storeController.postRemoveFromFavourite,
);

module.exports = storeRouter;
