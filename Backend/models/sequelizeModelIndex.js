const { sequelize, DataTypes } = require("../utils/SequelizeInstance");

const Products = require("./Products.model")(sequelize, DataTypes);


const db = {
  sequelize,
  Products
};

module.exports = db;