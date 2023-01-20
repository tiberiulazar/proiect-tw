const express = require("express");
const User = require("../models/user");
const Trip = require("../models/trip");
const { checkAdminPermissionMiddleware } = require("../utils/middlewares");

const router = express.Router();

router.get("/users", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/users/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
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
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.status(200).json({
        message: "Account deleted",
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    next(err);
  }
});

router.put("/users/:id", async (req, res) => {
  const ELIGIBLE_FIELDS = ["firstName", "lastName", "email"];
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      const newUser = await user.update(req.body, { fields: ELIGIBLE_FIELDS });
      res.status(200).json({
        message: "User updated",
        data: newUser,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    next(err);
  }
});

router.put(
  "/users/:id/changeRole",
  checkAdminPermissionMiddleware,
  async (req, res) => {
    const ELIGIBLE_FIELDS = ["role"];
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        const newUser = await user.update(req.body, {
          fields: ELIGIBLE_FIELDS,
        });
        res.status(200).json({
          message: "User role changed",
          data: newUser,
        });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (err) {
      console.warn(err);
      next(err);
    }
  }
);

router.post("/users/:uid/startTrip/:tid", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.uid, {
      include: [
        {
          model: Trip,
          as: "startedTrips",
        },
      ],
    });
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    const trip = await Trip.findByPk(req.params.tid);
    const hasThatTrip = await user.hasStartedTrip(trip);

    if (hasThatTrip) {
      res.status(400).json({
        message: "Trip already started!",
      });
      return;
    }

    if (trip) {
      await user.addStartedTrip(trip);
      await user.save();
      await trip.save();
      const newUserData = await User.findByPk(req.params.uid, {
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
      res.status(200).json({
        message: "Trip started",
        data: newUserData,
      });
    } else {
      res.status(404).json({
        message: "Trip not found",
      });
    }
  } catch (err) {
    console.warn(err);
    next();
  }
});

router.post("/users/:uid/cancelTrip/:tid", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.uid, {
      include: [
        {
          model: Trip,
          as: "startedTrips",
        },
      ],
    });
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    const trip = await Trip.findByPk(req.params.tid);
    const hasThatTrip = await user.hasStartedTrip(trip);

    if (!hasThatTrip) {
      res.status(400).json({
        message: "Trip not started yet!",
      });
      return;
    }

    if (trip) {
      await user.removeStartedTrip(trip);
      await user.save();
      await trip.save();
      const newUserData = await User.findByPk(req.params.uid, {
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
      res.status(200).json({
        message: "Trip canceled",
        data: newUserData,
      });
    } else {
      res.status(404).json({
        message: "Trip not found",
      });
    }
  } catch (err) {
    console.warn(err);
    next();
  }
});

router.post("/users/:uid/likeTrip/:tid", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.uid, {
      include: [
        {
          model: Trip,
          as: "likedTrips",
        },
      ],
    });
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    const trip = await Trip.findByPk(req.params.tid);
    const hasThatTrip = await user.hasLikedTrip(trip);

    if (hasThatTrip) {
      res.status(400).json({
        message: "Trip already liked!",
      });
      return;
    }

    if (trip) {
      await user.addLikedTrip(trip);
      await user.save();
      await trip.save();
      const newUserData = await User.findByPk(req.params.uid, {
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
      res.status(200).json({
        message: "Trip liked",
        data: newUserData,
      });
    } else {
      res.status(404).json({
        message: "Trip not found",
      });
    }
  } catch (err) {
    console.warn(err);
    next();
  }
});

router.post("/users/:uid/dislikeTrip/:tid", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.uid, {
      include: [
        {
          model: Trip,
          as: "likedTrips",
        },
      ],
    });
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    const trip = await Trip.findByPk(req.params.tid);
    const hasThatTrip = await user.hasLikedTrip(trip);

    if (!hasThatTrip) {
      res.status(400).json({
        message: "You didn't liked that trip!",
      });
      return;
    }

    if (trip) {
      await user.removeLikedTrip(trip);
      await user.save();
      await trip.save();
      const newUserData = await User.findByPk(req.params.uid, {
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
      res.status(200).json({
        message: "Trip disliked",
        data: newUserData,
      });
    } else {
      res.status(404).json({
        message: "Trip not found",
      });
    }
  } catch (err) {
    console.warn(err);
    next();
  }
});

router.post("/users/:uid/finishTrip/:tid", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.uid, {
      include: [
        {
          model: Trip,
          as: "completedTrips",
        },
        {
          model: Trip,
          as: "startedTrips",
        },
      ],
    });
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    const trip = await Trip.findByPk(req.params.tid);
    const hasThatTripStarted = await user.hasStartedTrip(trip);

    if (!hasThatTripStarted) {
      res.status(400).json({
        message: "You don't have that trip in progress!",
      });
      return;
    }

    if (trip) {
      await user.removeStartedTrip(trip);
      await user.addCompletedTrip(trip);
      await user.save();
      await trip.save();
      const newUserData = await User.findByPk(req.params.uid, {
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
      res.status(200).json({
        message: "Trip completed",
        data: newUserData,
      });
    } else {
      res.status(404).json({
        message: "Trip not found",
      });
    }
  } catch (err) {
    console.warn(err);
    next();
  }
});

module.exports = router;
