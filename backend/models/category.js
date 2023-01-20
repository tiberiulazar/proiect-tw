const sequelize = require("../db").sequelize;
const DataTypes = require("sequelize");

const Category = sequelize.define("category", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 20],
    },
  },
});

module.exports = Category;
