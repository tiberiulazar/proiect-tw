const sequelize = require("../db").sequelize;
const DataTypes = require("sequelize");

const Trip = sequelize.define("trip", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 100],
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  difficulty: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  distance: {
    type: DataTypes.NUMBER,
    validate: {
      min: 0,
    },
  },
  duration: {
    type: DataTypes.NUMBER,
    validate: {
      min: 0,
    },
  },
  startLatitude: {
    type: DataTypes.NUMBER,
    validate: {
      min: -90,
      max: 90,
    },
  },
  startLongitude: {
    type: DataTypes.NUMBER,
    validate: {
      min: -180,
      max: 180,
    },
  },
  finishLatitude: {
    type: DataTypes.NUMBER,
    validate: {
      min: -90,
      max: 90,
    },
  },
  finishLongitude: {
    type: DataTypes.NUMBER,
    validate: {
      min: -180,
      max: 180,
    },
  },
});

module.exports = Trip;
