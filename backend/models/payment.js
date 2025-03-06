const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    productDetails: [
        {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    time: {
        type: Date,
        default: Date.now
    }
});

const Payment = mongoose.model('Payment', PaymentSchema);
module.exports = Payment;
