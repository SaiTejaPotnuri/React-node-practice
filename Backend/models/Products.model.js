module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define("products", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: [3, 50],
      },
      field: "name",
      comment: "Product name",
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue("description");
        return rawValue ? rawValue.trim() : null;
      },
      set(value) {
        this.setDataValue("description", value ? value.trim() : null);
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_Available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });

  return Products;
};