require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoutes = require("./router/authRoutes");
const adminRoutes = require("./router/adminRoutes");
const productRoutes = require("./router/productRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://ecoms-mern.onrender.com"],
    credentials: true,
  })
);
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    console.log("MongoDB connected!");
  })
  .catch((err) => {
    console.log("DB error!" + err.message);
  });

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);

// --------------------Deployment---------------

const path = require("path");

app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html"));
});

// const path = require("path"); //path module
// const __dirname1 = path.resolve();

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname1, "..", "frontend", "dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(
//       path.resolve(__dirname1, "..", "frontend", "dist", "index.html")
//     );
//   });

// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running Successfully!");
//   });
// }

//--------------------Deployment---------------

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
