const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose'); // ✅ Import mongoose

const Product = require('../models/productModel');

const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save images to "uploads" folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// Get all products
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json({ products });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// Get a single product by ID
router.get('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // ✅ Check if the ID is valid before querying MongoDB
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Product ID" });
        }

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ success: true, product });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});



// Add a new product (Admin Only)
router.post('/product', upload.single('image'), async (req, res) => {
    try {
        const { name, price, description, stock, seller } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        const newProduct = new Product({ name, price, description, stock, images: [{ image }], seller });
        await newProduct.save();
        res.status(201).json({ message: "Product added successfully", product: newProduct });
    } catch (error) {
        res.status(500).json({ message: "Error adding product", error: error.message });
    }
});

// Update a product (Admin Only)
router.put('/product/:id', upload.single('image'), async (req, res) => {
    try {
        const { name, price, description, stock, seller } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, price, description, stock, seller, images: image ? [{ image }] : undefined },
            { new: true }
        );

        res.json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error: error.message });
    }
});

// Delete a product (Admin Only)
router.delete('/product/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error: error.message });
    }
});

module.exports = router;
