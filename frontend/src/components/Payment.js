// import React, { useState } from 'react';
// import axios from 'axios';
// import {
//     CardElement,
//     useStripe,
//     useElements,
//     Elements
// } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';

// // Load Stripe
// const stripePromise = loadStripe('pk_test_51Qt2O6R6V1onzJ1OQqRWqnuVzFxdZe3kE7uxBGcb0BHX3Fwb2TNEdS6LaC3wqVJT19grnEr4k0H4rmefujNP2IzO003uHcLlGr');

// const PaymentForm = () => {
//     const stripe = useStripe();
//     const elements = useElements();
//     const [loading, setLoading] = useState(false);

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         setLoading(true);

//         const { data } = await axios.post('http://localhost:5000/api/payment', {
//             amount: 2000 // Amount in cents ($20.00)
//         });

//         const cardElement = elements.getElement(CardElement);

//         const paymentResult = await stripe.confirmCardPayment(data.clientSecret, {
//             payment_method: {
//                 card: cardElement,
//                 billing_details: {
//                     name: 'Customer Name'
//                 },
//             },
//         });

//         if (paymentResult.error) {
//             alert(paymentResult.error.message);
//         } else {
//             if (paymentResult.paymentIntent.status === 'succeeded') {
//                 alert('Payment Successful!');
//             }
//         }
//         setLoading(false);
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <CardElement className="border p-2 rounded" />
//             <button
//                 type="submit"
//                 className="bg-blue-500 text-white p-2 rounded mt-4"
//                 disabled={!stripe || loading}
//             >
//                 {loading ? 'Processing...' : 'Pay Now'}
//             </button>
//         </form>
//     );
// };

// const Payment = () => {
//     return (
//         <Elements stripe={stripePromise}>
//             <div className="flex items-center justify-center min-h-screen bg-gray-100">
//                 <div className="bg-white p-8 rounded shadow-lg">
//                     <h2 className="text-2xl mb-4">Complete Your Payment</h2>
//                     <PaymentForm />
//                 </div>
//             </div>
//         </Elements>
//     );
// };

// export default Payment;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//     CardElement,
//     useStripe,
//     useElements,
//     Elements
// } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { useTranslation } from 'react-i18next';

// // Load Stripe
// const stripePromise = loadStripe('pk_test_51Qt2O6R6V1onzJ1OQqRWqnuVzFxdZe3kE7uxBGcb0BHX3Fwb2TNEdS6LaC3wqVJT19grnEr4k0H4rmefujNP2IzO003uHcLlGr');

// const PaymentForm = ({ cartItems, setCartItems, user }) => {
//     const stripe = useStripe();
//     const elements = useElements();
//     const navigate = useNavigate();
//     const { t } = useTranslation();
//     const [loading, setLoading] = useState(false);
//     const [paymentSuccessful, setPaymentSuccessful] = useState(false);

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         setLoading(true);

//         // Calculate total amount
//         const amount = cartItems.reduce((acc, item) => acc + item.qty * item.product.price, 0).toFixed(2);

//         // Get client secret from backend
//         const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/create-payment-intent`, {
//             amount: amount * 100 // Amount in cents
//         });

//         const cardElement = elements.getElement(CardElement);

//         // Confirm payment
//         const paymentResult = await stripe.confirmCardPayment(data.clientSecret, {
//             payment_method: {
//                 card: cardElement,
//                 billing_details: {
//                     name: user.name
//                 }
//             }
//         });

//         if (paymentResult.error) {
//             toast.error(paymentResult.error.message);
//         } else {
//             if (paymentResult.paymentIntent.status === 'succeeded') {
//                 toast.success(t('Payment Successful! Order Placed.'));

//                 // Store payment details in database
//                 const paymentDetails = {
//                     user: user.name,
//                     amount: amount,
//                     productDetails: cartItems.map(item => ({
//                         name: item.product.name,
//                         qty: item.qty,
//                         price: item.product.price
//                     })),
//                     time: new Date().toISOString()
//                 };

//                 await axios.post(`${process.env.REACT_APP_API_URL}/payment`, paymentDetails)
//                     .then(() => {
//                         setCartItems([]); // Clear cart
//                         setPaymentSuccessful(true);
//                     })
//                     .catch((error) => {
//                         console.error('Error storing payment details:', error);
//                         toast.error(t('Failed to save payment details.'));
//                     });
//             }
//         }
//         setLoading(false);
//     };

//     useEffect(() => {
//         if (paymentSuccessful) {
//             navigate('/order-confirmation');
//         }
//     }, [paymentSuccessful, navigate]);

//     return (
//         <form onSubmit={handleSubmit}>
//             <CardElement className="border p-2 rounded" />
//             <button
//                 type="submit"
//                 className="bg-blue-500 text-white p-2 rounded mt-4"
//                 disabled={!stripe || loading}
//             >
//                 {loading ? t('Processing...') : t('Pay Now')}
//             </button>
//         </form>
//     );
// };

// const Payment = ({ cartItems, setCartItems, user }) => {
//     return (
//         <Elements stripe={stripePromise}>
//             <div className="flex items-center justify-center min-h-screen bg-gray-100">
//                 <div className="bg-white p-8 rounded shadow-lg">
//                     <h2 className="text-2xl mb-4">Complete Your Payment</h2>
//                     <PaymentForm cartItems={cartItems} setCartItems={setCartItems} user={user} />
//                 </div>
//             </div>
//         </Elements>
//     );
// };

// export default Payment;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//     CardElement,
//     useStripe,
//     useElements,
//     Elements
// } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { useTranslation } from 'react-i18next';

// // Load Stripe
// const stripePromise = loadStripe('pk_test_51Qt2O6R6V1onzJ1OQqRWqnuVzFxdZe3kE7uxBGcb0BHX3Fwb2TNEdS6LaC3wqVJT19grnEr4k0H4rmefujNP2IzO003uHcLlGr');

// const PaymentForm = ({ cartItems = [], setCartItems, user }) => {
//     const stripe = useStripe();
//     const elements = useElements();
//     const navigate = useNavigate();
//     const { t } = useTranslation();
//     const [loading, setLoading] = useState(false);
//     const [paymentSuccessful, setPaymentSuccessful] = useState(false);
//     const [ setOrderComplete] = useState(false);


//     // Place Order
//     const placeOrderHandler = async () => {
//         const user = JSON.parse(localStorage.getItem("user"));
    
//         if (!user) {
//             toast.error(t("Please log in to place an order"));
//             navigate("/login");
//             return;
//         }
    
//         try {
//             await axios.post(`${process.env.REACT_APP_API_URL}/order`, cartItems, {
//                 headers: { "Content-Type": "application/json" },
//             });
    
//             // Clear cart from both state and localStorage
//             setCartItems([]);
//             localStorage.removeItem("cartItems");
    
//             setOrderComplete(true);
//             toast.success(t("Order Successfully Placed"));
//         } catch (error) {
//             toast.error(t("Failed to Place Order"));
//         }
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         setLoading(true);

//         // Calculate total amount safely
//         const amount = Array.isArray(cartItems) && cartItems.length > 0
//             ? cartItems.reduce((acc, item) => acc + item.qty * item.product.price, 0).toFixed(2)
//             : 0;

//         if (amount <= 0) {
//             toast.error(t('Your cart is empty.'));
//             setLoading(false);
//             return;
//         }

//         try {
//             // Get client secret from backend
//             const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/create-payment-intent`, {
//                 amount: amount * 100 // Amount in cents
//             });

//             const cardElement = elements.getElement(CardElement);

//             // Confirm payment
//             const paymentResult = await stripe.confirmCardPayment(data.clientSecret, {
//                 payment_method: {
//                     card: cardElement,
//                     billing_details: {
//                         name: user?.name || 'Anonymous'
//                     }
//                 }
//             });

//             if (paymentResult.error) {
//                 toast.error(paymentResult.error.message);
//             } else {
//                 if (paymentResult.paymentIntent.status === 'succeeded') {
//                     toast.success(t('Payment Successful! Order Placed.'));

//                     // Store payment details in database
//                     const paymentDetails = {
//                         user: user?.name || 'Anonymous',
//                         amount: amount,
//                         productDetails: cartItems.map(item => ({
//                             name: item.product.name,
//                             qty: item.qty,
//                             price: item.product.price
//                         })),
//                         time: new Date().toISOString()
//                     };

//                     await axios.post(`${process.env.REACT_APP_API_URL}/payment`, paymentDetails)
//                         .then(() => {
//                             setCartItems([]); // Clear cart
//                             setPaymentSuccessful(true);
//                         })
//                         .catch((error) => {
//                             console.error('Error storing payment details:', error);
//                             toast.error(t('Failed to save payment details.'));
//                         });
//                 }
//             }
//         } catch (error) {
//             console.error('Payment error:', error);
//             toast.error(t('Payment failed. Please try again.'));
//         }

//         setLoading(false);
//     };

//     useEffect(() => {
//         if (paymentSuccessful) {
//             navigate('/order-confirmation');
//         }
//     }, [paymentSuccessful, navigate]);

//     return (
//         <form onSubmit={handleSubmit}>
//             <CardElement className="border p-2 rounded" />
//             <button
//                 type="submit"
//                 className="!bg-black-500 text-white p-2 rounded mt-4"
//                 disabled={!stripe || loading}
//             >
//                 {loading ? t('Processing...') : t('Pay Now')}
//             </button>
//         </form>
//     );
// };

// const Payment = ({ cartItems = [], setCartItems, user }) => {
//     return (
//         <Elements stripe={stripePromise}>
//             <div className="flex items-center justify-center min-h-screen bg-gray-100">
//                 <div className="bg-white p-8 rounded shadow-lg">
//                     <h2 className="text-2xl mb-4">Complete Your Payment</h2>
//                     <PaymentForm cartItems={cartItems} setCartItems={setCartItems} user={user} />
//                 </div>
//             </div>
//         </Elements>
//     );
// };

// export default Payment;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//     CardElement,
//     useStripe,
//     useElements,
//     Elements
// } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { useTranslation } from 'react-i18next';

// // Load Stripe
// const stripePromise = loadStripe('pk_test_51Qt2O6R6V1onzJ1OQqRWqnuVzFxdZe3kE7uxBGcb0BHX3Fwb2TNEdS6LaC3wqVJT19grnEr4k0H4rmefujNP2IzO003uHcLlGr');

// const PaymentForm = ({ cartItems, setCartItems, user }) => {
//     const stripe = useStripe();
//     const elements = useElements();
//     const navigate = useNavigate();
//     const { t } = useTranslation();
//     const [loading, setLoading] = useState(false);
//     const [paymentSuccessful, setPaymentSuccessful] = useState(false);
//     const [orderComplete, setOrderComplete] = useState(false);  // Fixed state setter

//     // Place Order
//     const placeOrderHandler = async () => {
//         try {
//             // Ensure we send only the necessary data to the API
//             const orderData = {
//                 cartItems: cartItems.map(item => ({
//                     product: item.product._id,
//                     qty: item.qty
//                 }))
//             };

//             await axios.post(`${process.env.REACT_APP_API_URL}/order`, orderData, {
//                 headers: { "Content-Type": "application/json" },
//             });

//             setCartItems([]); // Clear the cart
//             localStorage.removeItem("cartItems");

//             setOrderComplete(true);
//             toast.success(t("Order Successfully Placed"));
//         } catch (error) {
//             toast.error(t("Failed to Place Order"));
//         }
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         setLoading(true);
    
//         const amount = Array.isArray(cartItems) && cartItems.length > 0
//             ? cartItems.reduce((acc, item) => acc + item.qty * item.product.price, 0) * 100
//             : 0;
    
//         if (amount <= 0) {
//             toast.error(t('Your cart is empty.'));
//             setLoading(false);
//             return;
//         }
    
//         try {
//             // Create Payment Intent
//             const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/create-payment-intent`, {
//                 amount: amount 
//             });
    
//             const cardElement = elements.getElement(CardElement);
//             const paymentResult = await stripe.confirmCardPayment(data.clientSecret, {
//                 payment_method: {
//                     card: cardElement,
//                     billing_details: {
//                         name: user?.name || 'Anonymous'
//                     }
//                 }
//             });
    
//             // ✅ Check if Payment is Successful Before Proceeding
//             if (paymentResult.error) {
//                 toast.error(paymentResult.error.message);
//                 setLoading(false);
//                 return;
//             } 
            
//             if (paymentResult.paymentIntent.status === 'succeeded') {
//                 toast.success(t('Payment Successful! Processing Order...'));
    
//                 try {
//                     // Store Payment Details in DB
//                     await axios.post(`${process.env.REACT_APP_API_URL}/payment`, {
//                         user: user?.name || 'Anonymous',
//                         amount,
//                         productDetails: cartItems.map(item => ({
//                             name: item.product.name,
//                             qty: item.qty,
//                             price: item.product.price
//                         })),
//                         time: new Date().toISOString()
//                     });
    
//                     await placeOrderHandler();
//                     setPaymentSuccessful(true);
//                 } catch (error) {
//                     console.error('Database Error:', error);
//                     toast.error(t('Payment succeeded, but order placement failed. Please contact support.'));
//                 }
//             }
//         } catch (error) {
//             console.error('Payment error:', error);
//             toast.error(t('Payment failed. Please try again.'));
//         }
    
//         setLoading(false);
//     };
    

//     useEffect(() => {
//         if (paymentSuccessful) {
//             navigate('/order-confirmation');
//         }
//     }, [paymentSuccessful, navigate]);

//     return (
//         <form onSubmit={handleSubmit}>
//             <CardElement className="border p-2 rounded" />
//             <button
//                 type="submit"
//                 className="bg-black text-white p-2 rounded mt-4 w-full"
//                 disabled={!stripe || loading}
//             >
//                 {loading ? t('Processing...') : t('Pay & Place Order')}
//             </button>
//         </form>
//     );
// };

// const Payment = ({ cartItems, setCartItems, user }) => {
//     return (
//         <Elements stripe={stripePromise}>
//             <div className="flex items-center justify-center min-h-screen bg-gray-100">
//                 <div className="bg-white p-8 rounded shadow-lg">
//                     <h2 className="text-2xl mb-4">Complete Your Payment</h2>
//                     <PaymentForm cartItems={cartItems} setCartItems={setCartItems} user={user} />
//                 </div>
//             </div>
//         </Elements>
//     );
// };

// export default Payment;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    CardElement,
    useStripe,
    useElements,
    Elements
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

// Load Stripe
const stripePromise = loadStripe('pk_test_51Qt2O6R6V1onzJ1OQqRWqnuVzFxdZe3kE7uxBGcb0BHX3Fwb2TNEdS6LaC3wqVJT19grnEr4k0H4rmefujNP2IzO003uHcLlGr');

const PaymentForm = ({ cartItems, setCartItems, user }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [paymentSuccessful, setPaymentSuccessful] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);

    // Place Order
    const placeOrderHandler = async () => {
        try {
            const orderData = {
                cartItems: cartItems.map(item => ({
                    product: item.product._id,
                    qty: item.qty
                }))
            };

            await axios.post(`${process.env.REACT_APP_API_URL}/order`, orderData, {
                headers: { "Content-Type": "application/json" },
            });

            setCartItems([]);
            localStorage.removeItem("cartItems");

            setOrderComplete(true);
            toast.success(t("Order Successfully Placed"));
        } catch (error) {
            toast.error(t("Failed to Place Order"));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
    
        const amount = Array.isArray(cartItems) && cartItems.length > 0
            ? cartItems.reduce((acc, item) => acc + item.qty * item.product.price, 0) * 100
            : 0;
    
        if (amount <= 0) {
            toast.error(t('Your cart is empty.'));
            setLoading(false);
            return;
        }
    
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/create-payment-intent`, 
                {amount}
            );
    
            const cardElement = elements.getElement(CardElement);
            const paymentResult = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: user?.name || 'Anonymous'
                    }
                }
            });
    
            if (paymentResult.error) {
                toast.error(paymentResult.error.message);
                setLoading(false);
                return;
            } 
            
            if (paymentResult.paymentIntent.status === 'succeeded') {
                toast.success(t('Payment Successful! Processing Order...'));
    
                try {
                    await axios.post(`${process.env.REACT_APP_API_URL}/payment`, {
                        user: user?.name || 'Anonymous',
                        amount: amount / 100,
                        productDetails: cartItems.map(item => ({
                            name: item.product.name,
                            qty: item.qty,
                            price: item.product.price
                        })),
                        time: new Date().toISOString()
                    });
    
                    setCartItems([]);
                    setPaymentSuccessful(true);
                } catch (error) {
                    console.error('Error storing payment details:', error);
                    toast.error(t('Failed to save payment details.'));
                }
            }
        } catch (error) {
            console.error('Payment error:', error);
            toast.error(t('Payment failed. Please try again.'));
        }
    
        setLoading(false);
    };

    useEffect(() => {
        if (paymentSuccessful) {
            navigate('/order-confirmation');
        }
    }, [paymentSuccessful, navigate]);

    return (
        <form onSubmit={handleSubmit}>
            <CardElement className="border p-2 rounded" />
            <button
                type="submit"
                className="bg-black text-white p-2 rounded mt-4"
                disabled={!stripe || loading}
            >
                {loading ? t('Processing...') : t('Pay Now')}
            </button>
        </form>
    );
};

const Payment = ({ cartItems, setCartItems, user }) => {
    return (
        <Elements stripe={stripePromise}>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded shadow-lg">
                    <h2 className="text-2xl mb-4">Complete Your Payment</h2>
                    <PaymentForm cartItems={cartItems} setCartItems={setCartItems} user={user} />
                </div>
            </div>
        </Elements>
    );
};

export default Payment;

