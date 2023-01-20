const express = require("express");
const Category = require("../models/category");
const Trip = require("../models/trip");
const { checkAdminPermissionMiddleware } = require("../utils/middlewares");

const router = express.Router();

router.get("/categories", async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
});

router.get("/categories/:id", async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (category) {
      res.status(200).json({
        message: "Category found",
        data: category,
      });
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (err) {
    next(err);
  }
});

router.post(
  "/categories",
  checkAdminPermissionMiddleware,
  async (req, res, next) => {
    try {
      const category = await Category.create(req.body);
      res.status(200).json({
        message: "Category created",
        data: category,
      });
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/categories/:id",
  checkAdminPermissionMiddleware,
  async (req, res, next) => {
    const ELIGIBLE_FIELDS = ["name"];
    try {
      const category = await Category.findByPk(req.params.id);
      if (category) {
        const updatedCategory = await category.update(req.body, {
          fields: ELIGIBLE_FIELDS,
        });
        res.status(202).json({
          message: "Category found",
          data: updatedCategory,
        });
      } else {
        res.status(404).json({ message: "Category not found" });
      }
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/categories/:id",
  checkAdminPermissionMiddleware,
  async (req, res, next) => {
    try {
      const category = await Category.findByPk(req.params.id);
      if (category) {
        const deletedCategory = await category.destroy();
        res.status(203).json({
          message: "Category found",
          data: deletedCategory,
        });
      } else {
        res.status(404).json({ message: "Category not found" });
      }
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
