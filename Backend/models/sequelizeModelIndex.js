const { sequelize, DataTypes } = require("../utils/SequelizeInstance");
const Products = require("./Products.model")(sequelize, DataTypes);
const Users = require("./users.model")(sequelize, DataTypes);


Users.hasMany(Products);
Products.belongsTo(Users);

const db = {
  sequelize,
  Products,
  Users
};

module.exports = db;