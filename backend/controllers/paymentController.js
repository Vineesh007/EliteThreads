const Stripe = require('stripe');
const path = require('path');
const Payment = require('../models/payment');

require('dotenv').config({ path: path.join(__dirname, '../config/config.env') });
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

console.log('Stripe Secret Key:', process.env.STRIPE_SECRET_KEY);

exports.processPayment = async (req, res) => {
    try {
        const { amount } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            payment_method_types: ['card'],
        });

        res.status(200).json({
            success: true,
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error("Payment Processing Error:", error); // Logs the exact error
        res.status(500).json({ message: 'Payment failed', error: error.message });
    }
};


exports.savePaymentDetails = async (req, res) => {
    try {
        const { user, amount, productDetails, time } = req.body;

        const newPayment = new Payment({
            user,
            amount,
            productDetails,
            time
        });

        await newPayment.save();

        res.status(201).json({ success: true, message: 'Payment details saved successfully' });
    } catch (error) {
        console.error('Error saving payment details:', error);
        res.status(500).json({ success: false, message: 'Failed to save payment details', error: error.message });
    }
};
