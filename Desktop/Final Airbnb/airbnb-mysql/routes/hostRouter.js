// External Module
const express = require("express");
const hostRouter = express.Router();

// Local Module
const hostController = require("../controllers/hostController");

// Middleware: Protect all host routes - only hosts can access
hostRouter.use((req, res, next) => {
  // Check if user is logged in
  if (!req.isLoggedIn) {
    return res.redirect("/login");
  }

  // Check if user is a host
  if (req.session.user.userType !== "host") {
    return res.redirect("/homes");
  }

  next();
});

hostRouter.get("/add-home", hostController.getAddHome);
hostRouter.post("/add-home", hostController.postAddHome);
hostRouter.get("/host-home-list", hostController.getHostHomes);
hostRouter.get("/reservations", hostController.getReservations);
hostRouter.get("/edit-home/:homeId", hostController.getEditHome);
hostRouter.post("/edit-home", hostController.postEditHome);
hostRouter.post("/delete-home/:homeId", hostController.postDeleteHome);

module.exports = hostRouter;
