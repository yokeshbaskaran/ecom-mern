const User = require("../models/user");
const Product = require("../models/product");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const hash = await bcrypt.hashSync(password, 10);
    const userData = {
      email,
      password: hash,
    };

    const newUser = await User.create(userData);
    if (newUser) {
      res.status(201).json(newUser);
    } else {
      res.status(404).json({ message: "User not created" });
    }
  } catch (error) {
    res.status(404).json({ message: `User not created! ${error.message}` });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const dbUser = await User.findOne({ email });
    const compared = await bcrypt.compareSync(password, dbUser.password);

    if (dbUser && compared) {
      const { password: hashed, ...userDatas } = dbUser;

      const token = await jwt.sign(
        { userDatas },
        process.env.ACCESS_TOKEN_SECRET
      );

      res
        .cookie("access_token", token)
        .json({ email: dbUser.email, message: "User logined" });
    } else {
      res.status(404).json({ message: "Wrong credentials" });
    }
  } catch (error) {
    res.status(404).json({ message: `User not logined! ${error.message}` });
  }
};

const profile = async (req, res) => {
  const { access_token } = req.cookies;
  // console.log("token-userprofile", access_token);

  if (access_token) {
    jwt.verify(
      access_token,
      process.env.ACCESS_TOKEN_SECRET,
      {},
      (err, decoded) => {
        if (err) {
          console.log("Token Error!");
        }

        const { userDatas } = decoded;
        const { ...userInfo } = userDatas;
        const { email } = userInfo._doc;
        // console.log("user-info", userInfo._doc);

        res.status(200).json({
          email,
          msg: "User Profile Success",
        });
      }
    );
  }
};

const logout = async (req, res) => {
  res.cookie("access_token", "").json({ status: "ok" });
};

const getUsers = async (req, res) => {
  try {
    const allUsers = await User.find({}).lean();
    // console.log("allusers", allUsers);
    res.status(200).json(allUsers);
  } catch (error) {
    console.log("All User GET Error!" + error.message);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({}).lean();
    const restProds = allProducts.map(({ adminId, ...rest }) => rest);
    // console.log("docs", restProds);

    res.status(200).json(restProds);
  } catch (error) {
    console.log("User products Error!" + error.message);
  }
};

module.exports = { register, login, profile, logout, getUsers, getAllProducts };
