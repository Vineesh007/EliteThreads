const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const Product = require('./models/productModel');

// Load environment variables
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

// Use the correct environment variable
const DB_URL = process.env.DB_URL;

if (!DB_URL) {
    console.error("Error: DB_URL is not defined. Check your config.env file.");
    process.exit(1);
}

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => {
    console.error(`MongoDB Connection Error: ${err.message}`);
    process.exit(1);
});

// Read JSON file
const products = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'products.json'), 'utf-8'));

// Import Data
const importData = async () => {
    try {
        await Product.deleteMany(); // Clear previous data
        await Product.insertMany(products);
        console.log('✅ Data Imported Successfully');
        process.exit();
    } catch (error) {
        console.error(`❌ Error Importing Data: ${error.message}`);
        process.exit(1);
    }
};

importData();
