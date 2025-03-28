const { raw } = require("mysql2");
const db = require("../models/sequelizeModelIndex");
const Product = db.Products;
const sequelize = db.sequelize;


const AddProduct = async (req, res,next) => {
  const { name, description, price, isAvailable,userId } = req.body;
  if (!name || !price) {
    return res.status(400).json({
      success: false,
      message: "Product name and price are required",
    });
  }

  const newProduct = await Product.create({
    name,
    description,
    price,
    is_Available: isAvailable,
    userId
  });

  next()
  return res.status(200).json({
    success: true,
    message: "Product created successfully",
    product: newProduct,
  });
};

const GetProduct = async (req, res) => {
  try {
    const productsList = await Product.findAll({
        attributes: [
          ['id', 'pId'],        
          ['name', 'pName'],    
          ['description', 'pDesc'], 
          ['price', 'pPrice'],  
          ['is_Available', 'isAvailable']  
        ],
        raw: true
      });

        if (productsList.length > 0) {
        return res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            products: productsList,
        });
        } else {
        return res.status(200).json({
            success: true,
            message: "No products found",
            products: productsList || [],
        });
        }
  } catch (err) {
    console.error("Error fetching products:", err);
    return res.status(500).json({
      success: false,
      message: "Error fetching products",
    });
  }
};

const UpdateProduct = async (req, res) => {
  console.log("update product api called", req.url);
  // res.send("update product api called");
};

const DeleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    
    const affectedRows = await Product.destroy({
      where: { id: id }
    });
      console.log("affectedRows", affectedRows);
    if (affectedRows > 0) {
      return res.status(200).json({
        success: true,
        message: "Product deleted successfully",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error deleting product",
    });
  }
};

module.exports = { AddProduct, GetProduct, UpdateProduct, DeleteProduct };
