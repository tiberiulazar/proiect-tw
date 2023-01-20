const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.db",
  define: {
    timestamps: false,
  },
});

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("models successfully (re)created");
  })
  .catch((err) => {
    console.warn("error creating models");
    console.warn(err);
  });

module.exports = {
  Sequelize,
  sequelize,
};
