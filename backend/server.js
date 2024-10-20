import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/productmodel.js";


dotenv.config();



const app = express();

app.use(express.json());

app.post("/api/products", async (req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ successfalse, message: "Please provide all fields" });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct});
    } catch (error) {
        console.error("Error in creating product", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
})


app.listen(2000, () => {
  connectDB();
  console.log("Server is running on port at http://localhost:2000");
});
