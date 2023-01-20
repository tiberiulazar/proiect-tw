const User = require("../models/user");
const Trip = require("../models/trip");
const moment = require("moment");
const { userRoles } = require("./constants");

const checkTokenMiddleware = async (req, res, next) => {
  const token = req.headers.auth;
  if (token) {
    try {
      const user = await User.findOne({
        where: {
          token: token,
        },
      });

      if (user) {
        if (moment().diff(user.expiry, "seconds") < 0) {
          res.locals.user = user;
          next();
        } else {
          user.token = undefined;
          user.expiry = undefined;
          res.status(401).json({
            message: "Token has expired",
          });
        }
      } else {
        res.status(401).json({
          message: "User unauthorized",
        });
      }
    } catch (err) {
      console.warn(err);
      next();
    }
  } else {
    res.status(401).json({
      message: "User unauthorized",
    });
  }
};

const checkAdminPermissionMiddleware = async (req, res, next) => {
  const user = res.locals.user;
  try {
    if (user?.role === userRoles.ADMIN) {
      next();
    } else {
      res.status(400).json({
        message: "Permission denied",
      });
    }
  } catch (err) {
    console.warn(err);
    next();
  }
};

module.exports = {
  checkTokenMiddleware,
  checkAdminPermissionMiddleware,
};
