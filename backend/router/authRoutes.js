const express = require("express");
const router = express.Router();

const {
  register,
  login,
  profile,
  logout,
  getUsers,
  getAllProducts,
} = require("../controllers/authController");

// router.get("/", (req, res) => {
//   res.status(200).send("TEst is WoRkinG!");
// });

router.post("/register", register);
router.post("/login", login);
router.get("/profile", profile);
router.post("/logout", logout);

//for get all users
router.get("/allUsers", getUsers);

router.get("/product", getAllProducts);

module.exports = router;
