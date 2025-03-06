const express = require('express');
const router = express.Router();
 
const { processPayment, savePaymentDetails } = require('../controllers/paymentController');


router.post('/payment', savePaymentDetails );
router.post("/create-payment-intent",processPayment )

module.exports = router;
