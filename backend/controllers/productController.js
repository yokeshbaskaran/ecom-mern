const Product = require("../models/product");
const jwt = require("jsonwebtoken");

const getProducts = async (req, res) => {
  const allProducts = await Product.find({}).populate("adminId");

  if (allProducts) {
    res.status(200).json({
      count: allProducts.count,
      data: allProducts,
    });
  } else {
    console.log("Product not found!");
  }
};

const createProduct = async (req, res) => {
  const { pname, brand, image, price, description } = req.body;
  const { access_token2 } = req.cookies;
  try {
    if (!access_token2) {
      console.log("Token is required!");
      res.status(404).json({ message: "Token is required!" });
    }

    jwt.verify(
      access_token2,
      process.env.ACCESS_TOKEN_SECRET,
      {},
      async (err, decoded) => {
        if (err) {
          console.log("Token is not here!");
          res.status(404).json({ message: "Token is must be required!" });
        }

        // console.log("userinfo-token", decoded);
        const data = {
          pname,
          brand,
          image,
          price,
          description,
          adminId: decoded.userInfo._id,
        };

        const newProduct = await Product.create(data);
        if (newProduct) {
          res.status(201).json(data);
        } else {
          console.log("Product not created");
        }
      }
    );
  } catch (error) {
    console.log("Create error!" + error.message);
  }
};

const singleProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const singleProduct = await Product.findById(id);

    if (singleProduct) {
      res.status(200).json(singleProduct);
    } else {
      console.log("Product not found!");
    }
  } catch (error) {
    console.log("SingleProd Error!!" + error.message);
  }
};

const editProduct = async (req, res) => {
  const { id } = req.params;
  const { pname, brand, image, price, description } = req.body;

  try {
    const prod = await Product.findById(id);

    if (prod) {
      const updated = await Product.updateOne(
        { _id: prod._id },
        {
          $set: {
            pname: pname || prod.pname,
            brand: brand || prod.brand,
            price: price || prod.price,
            image: image || prod.image,
            description: description || prod.description,
            updatedAt: Date.now(),
          },
        },
        {
          new: true,
          lean: true,
        }
      );
      res.status(200).json(updated);
    } else {
      console.log("Product not updated!");
    }
  } catch (error) {
    console.log("editItem Error!!" + error.message);
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteItem = await Product.deleteOne({ _id: id });

    if (deleteItem) {
      res.status(200).json({ msg: "Product Deleted success" });
      console.log("Item deleted", deleteItem);
    } else {
      console.log("Product not deleted!");
    }
  } catch (error) {
    console.log("Delete Error!!" + error.message);
  }
};

module.exports = {
  getProducts,
  createProduct,
  singleProduct,
  editProduct,
  deleteProduct,
};
