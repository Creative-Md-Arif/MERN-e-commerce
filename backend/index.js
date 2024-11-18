import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"

// pakages

import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// utils

import connectDB from "./config/db.js";

dotenv.config();
const port = process.env.PORT || 5000;

// connect to database
connectDB();

// create express app
const app = express();

const _dirname = path.resolve();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes)
app.use("/api/orders", orderRoutes)

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));



app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get('*', (req, res) => {
  res.sendFile(path.join(_dirname, "frontend", "dist", "index.html"));
})





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// routes
