const express = require("express");
const Trip = require("../models/trip");
const { checkAdminPermissionMiddleware } = require("../utils/middlewares");

const router = express.Router();

router.get("/trips", async (req, res, next) => {
  try {
    const trips = await Trip.findAll();
    res.status(200).json(trips);
  } catch (err) {
    next(err);
  }
});

router.get("/trips/:id", async (req, res, next) => {
  try {
    const trip = await Trip.findByPk(req.params.id);
    if (trip) {
      res.status(200).json(trips);
    } else {
      res.status(404).json({ message: "Trip not found" });
    }
  } catch (err) {
    next(err);
  }
});

router.post(
  "/trips",
  checkAdminPermissionMiddleware,
  async (req, res, next) => {
    try {
      const trip = await Trip.create(req.body);
      res.status(201).json({
        message: "Trip created",
        data: trip,
      });
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/trips/:id",
  checkAdminPermissionMiddleware,
  async (req, res, next) => {
    const ELIGIBLE_FIELDS = [
      "name",
      "description",
      "difficulty",
      "latitude",
      "longitude",
    ];
    try {
      const trip = await Trip.findByPk(req.params.id);
      if (trip) {
        const updatedTrip = await trip.update(req.body, {
          fields: ELIGIBLE_FIELDS,
        });
        res.status(201).json({
          message: "Trip updated successfully",
          data: updatedTrip,
        });
      } else {
        res.status(404).json({ message: "Trip not found" });
      }
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/trips/:id",
  checkAdminPermissionMiddleware,
  async (req, res, next) => {
    try {
      const trip = await Trip.findByPk(req.params.id);
      if (trip) {
        await trip.destroy();
        res.status(203).json({
          message: "Trip deleted successfully",
          data: trip,
        });
      } else {
        res.status(404).json({ message: "Trip not found" });
      }
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
