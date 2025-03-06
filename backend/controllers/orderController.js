// const orderModel = require('../models/orderModel');
// const productModel = require('../models/productModel');

// //Create Order - /api/v1/order 
// exports.createOrder = async (req, res, next) => {
//     try {
//         const cartItems = req.body.cartItems;
//         const amount = Number(cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0)).toFixed(2);
//         const status = 'pending';

//         const order = await orderModel.create({ cartItems, amount, status });

//         // Updating product stock properly
//         await Promise.all(
//             cartItems.map(async (item) => {
//                 const product = await productModel.findById(item.product);
//                 if (product) {
//                     product.stock -= item.qty;
//                     await product.save();
//                 }
//             })
//         );

//         res.json({ success: true, order });
//     } catch (error) {
//         console.error("Error placing order:", error);
//         res.status(500).json({ success: false, message: "Failed to place order" });
//     }
// };

const orderModel = require('../models/orderModel');
const productModel = require('../models/productModel');

// Create Order - /api/v1/order 
exports.createOrder = async (req, res, next) => {
    try {
        console.log("Received Order Data:", req.body); // Debugging log

        const cartItems = req.body.cartItems;
        const amount = Number(cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0)).toFixed(2);
        const status = 'pending';

        // Create order
        const order = await orderModel.create({ cartItems, amount, status });

        // Update product stock
        await Promise.all(
            cartItems.map(async (item) => {
                const product = await productModel.findById(item.product._id || item.product);
                if (product) {
                    if (product.stock >= item.qty) {
                        product.stock -= item.qty;
                        await product.save();
                    } else {
                        console.warn(`Insufficient stock for product: ${product._id}`);
                    }
                } else {
                    console.warn(`Product not found: ${item.product}`);
                }
            })
        );

        res.json({ success: true, order });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to place order", 
            error: error.message 
        });
    }
}

    
