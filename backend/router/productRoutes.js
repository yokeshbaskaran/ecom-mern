const express = require("express");
const router = express.Router();

const {
  getProducts,
  createProduct,
  singleProduct,
  editProduct,
  deleteProduct,
} = require("../controllers/productController");

router.get("/", getProducts);
router.post("/create", createProduct);
router.get("/:id", singleProduct);
router.put("/:id", editProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
