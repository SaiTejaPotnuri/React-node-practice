const { raw } = require("mysql2");
const db = require("../models/sequelizeModelIndex");
const Product = db.Products;
const sequelize = db.sequelize;


const AddProduct = async (req, res,next) => {
  const { name, description, price, isAvailable,userId } = req.body;
  
  const file = req.file;
  if (!name || !price) {
    return res.status(400).json({
      success: false,
      message: "Product name and price are required",
    });
  }

  if (!file) {
    return res.status(400).json({
      success: false,
      message: "Product image is required",
    });
  }

  const imageurl = file.location;


  const newProduct = await Product.create({
    name,
    imageurl,
    description,
    price,
    is_Available: isAvailable,
    userId
  });

  req.body.seqProductId = newProduct.id
  req.body.imageurl = newProduct.imageurl
  next()
  return res.status(200).json({
    success: true,
    message: "Product created successfully",
    product: newProduct,
  });
};

const GetProduct = async (req, res,next) => {
  const userId = req.user.id;
  try {
    const productsList = await Product.findAll({
        where: { userId },
        attributes: [
          ['id', 'pId'],  
          ['imageurl', 'pImage'],      
          ['name', 'pName'],    
          ['description', 'pDesc'], 
          ['price', 'pPrice'],  
          ['is_Available', 'isAvailable']  
        ],
        raw: true
      });

        if (productsList.length > 0) {
          next()
        return res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            products: productsList,
        });
        } else {
          next()
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

const DeleteProduct = async (req, res,next) => {
  try {
    const id = req.params.id;
    
    const affectedRows = await Product.destroy({
      where: { id: id }
    });
      console.log("affectedRows", affectedRows);
      next()
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
