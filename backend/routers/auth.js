const express = require("express");
const moment = require("moment");
const crypto = require("crypto");
const User = require("../models/user");
const Trip = require("../models/trip");
const { checkTokenMiddleware } = require("../utils/middlewares");

const router = express.Router();

const SESSION_TIME = 60;

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
        password: req.body.password,
      },
      include: [
        {
          model: Trip,
          as: "startedTrips",
        },
        {
          model: Trip,
          as: "completedTrips",
        },
        {
          model: Trip,
          as: "likedTrips",
        },
      ],
    });
    if (user) {
      user.token = crypto.randomBytes(64).toString("hex");
      user.expiry = moment().add(SESSION_TIME, "minutes");
      await user.save();
      res.status(200).json({
        message: "Logged in successfully",
        data: user,
      });
    } else {
      res.status(400).json({
        message: "Incorrect email or password",
      });
    }
  } catch (err) {
    next(err);
  }
});

router.post("/logout", checkTokenMiddleware, async (req, res, next) => {
  try {
    const user = res.locals.user;
    user.token = null;
    user.expiry = null;
    await user.save();
    res.status(200).json({
      message: "User logged out",
    });
  } catch (err) {
    console.warn(err);
    next(err);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    user.token = crypto.randomBytes(64).toString("hex");
    user.expiry = moment().add(SESSION_TIME, "minutes");
    await user.save();
    const fullUser = await User.findOne({
      where: {
        id: user.id,
      },
      include: [
        {
          model: Trip,
          as: "startedTrips",
        },
        {
          model: Trip,
          as: "completedTrips",
        },
        {
          model: Trip,
          as: "likedTrips",
        },
      ],
    });
    res.status(201).json({
      message: "User created",
      data: fullUser,
    });
  } catch (err) {
    console.warn(err);
    next(err);
  }
});

module.exports = router;
