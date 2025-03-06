// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//     cartItems: Array,
//     amount: String,
//     status: String,
//     createdAt: Date
// })

// const orderModel = mongoose.model('Order', orderSchema);

// module.exports = orderModel;

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    cartItems: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            qty: { type: Number, required: true }
        }
    ],
    amount: { type: Number, required: true },
    status: { type: String, default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
