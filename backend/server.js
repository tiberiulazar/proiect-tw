const express = require("express");
const { sequelize } = require("./db");
const cors = require("cors");

const PORT = 8080;

const app = express();

const userRouter = require("./routers/user");
const categoryRouter = require("./routers/category");
const tripRouter = require("./routers/trip");
const authRouter = require("./routers/auth");

app.use(cors());

app.use(express.json());

const User = require("./models/user");
const Trip = require("./models/trip");
const Category = require("./models/category");
const {
  checkTokenMiddleware,
  checkAdminPermissionMiddleware,
} = require("./utils/middlewares");

User.belongsToMany(Trip, {
  through: "CompletedTrips",
  as: "completedTrips",
});
User.belongsToMany(Trip, {
  through: "StartedTrips",
  as: "startedTrips",
});
User.belongsToMany(Trip, {
  through: "LikedTrips",
  as: "likedTrips",
});
Category.hasMany(Trip);

Trip.belongsToMany(User, {
  through: "CompletedTrips",
  as: "completedTrips",
});
Trip.belongsToMany(User, {
  through: "StartedTrips",
  as: "startedTrips",
});
Trip.belongsToMany(User, {
  through: "LikedTrips",
  as: "likedTrips",
});

app.get("/create", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    res.status(201).json({ message: "Database created!" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.use("/auth", authRouter);
app.use("/users-api", [checkTokenMiddleware, userRouter]);
app.use("/categories-api", [checkTokenMiddleware, categoryRouter]);
app.use("/trips-api", [checkTokenMiddleware, tripRouter]);

app.use((err, req, res, next) => {
  console.warn(err);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(PORT);
