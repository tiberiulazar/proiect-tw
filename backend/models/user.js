const sequelize = require("../db").sequelize;
const DataTypes = require("sequelize");
const { userRoles } = require("../utils/constants");

const User = sequelize.define("user", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 100],
    },
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 100],
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING(64),
    validate: {
      len: [3, 64],
    },
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: userRoles.USER,
    allowNull: false,
  },
  token: DataTypes.STRING,
  expiry: DataTypes.DATE,
});

module.exports = User;
