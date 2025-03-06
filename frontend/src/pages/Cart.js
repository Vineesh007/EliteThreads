
// import { Fragment, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { useTranslation } from 'react-i18next'; 
// import axios from 'axios';

// export default function Cart({ cartItems, setCartItems }) {
//     const [orderComplete, setOrderComplete] = useState(false);
//     const { t } = useTranslation(); 
//     const navigate = useNavigate(); 

//     // Increase Quantity
//     const increaseQty = (item) => {
//         if (item.product.stock > item.qty) {
//             setCartItems(cartItems.map(i =>
//                 i.product._id === item.product._id ? { ...i, qty: i.qty + 1 } : i
//             ));
//         }
//     };

//     // Decrease Quantity
//     const decreaseQty = (item) => {
//         if (item.qty > 1) {
//             setCartItems(cartItems.map(i =>
//                 i.product._id === item.product._id ? { ...i, qty: i.qty - 1 } : i
//             ));
//         }
//     };

//     // Remove Item from Cart
//     const removeItem = (item) => {
//         setCartItems(cartItems.filter(i => i.product._id !== item.product._id));
//     };

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
    
    

//     // Calculate Total Price
//     const getTotalPrice = () => (
//         cartItems.reduce((acc, item) => acc + item.qty * item.product.price, 0).toFixed(2)
//     );

//     // Navigate to Payment Page
//     const proceedToPayment = () => {
//         const user = JSON.parse(localStorage.getItem("user"));
    
//         if (!user) {
//             toast.error(t("Please log in to proceed with payment"));
//             navigate("/login");
//             return;
//         }
    
//         navigate("/payment");
//     };
    

//     return cartItems.length > 0 ? (
//         <Fragment>
//             <div className="container container-fluid">
//                 <h2 className="mt-5">
//                     {t('your_cart')}: <b>{cartItems.length} {t('items')}</b>
//                 </h2>

//                 <div className="row d-flex justify-content-between">
//                     <div className="col-12 col-lg-8">
//                         {cartItems.map((item) => (
//                             <Fragment key={item.product._id}>
//                                 <hr />
//                                 <div className="cart-item">
//                                     <div className="row">
//                                         <div className="col-4 col-lg-3">
//                                             <img
//                                                 src={item.product.images[0].image}
//                                                 alt={item.product.name}
//                                                 height="90"
//                                                 width="115"
//                                             />
//                                         </div>

//                                         <div className="col-5 col-lg-3">
//                                             <Link to={`/product/${item.product._id}`}>
//                                                 {item.product.name}
//                                             </Link>
//                                         </div>

//                                         <div className="col-4 col-lg-2 mt-4 mt-lg-0">
//                                             <p id="card_item_price">
//                                                 ${item.product.price}
//                                             </p>
//                                         </div>

//                                         <div className="d-flex">
//                                             <div className="stockCounter d-inline">
//                                                 <button
//                                                     className="btn btn-danger minus"
//                                                     onClick={() => decreaseQty(item)}
//                                                 >
//                                                     -
//                                                 </button>
//                                                 <input
//                                                     type="number"
//                                                     className="form-control count d-inline"
//                                                     value={item.qty}
//                                                     readOnly
//                                                 />
//                                                 <button
//                                                     className="btn btn-primary plus"
//                                                     onClick={() => increaseQty(item)}
//                                                 >
//                                                     +
//                                                 </button>
//                                                 <button
//                                                     className="btn btn-danger ms-2"
//                                                     onClick={() => removeItem(item)}
//                                                 >
//                                                     <i className="fa fa-trash"></i>
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </Fragment>
//                         ))}
//                     </div>

//                     <div className="col-12 col-lg-3 my-4">
//                         <div id="order_summary">
//                             <h4>{t('Order Summary')}</h4>
//                             <hr />
//                             <p>
//                                 {t('subtotal')}: 
//                                 <span className="order-summary-values">
//                                     {cartItems.reduce((acc, item) => acc + item.qty, 0)} {t('units')}
//                                 </span>
//                             </p>
//                             <p>
//                                 {t('total_price')}: 
//                                 <span className="order-summary-values">
//                                     ${getTotalPrice()}
//                                 </span>
//                             </p>
//                             <hr />
//                             <button
//                                 id="checkout_btn"
//                                 className="btn btn-primary btn-block"
//                                 onClick={placeOrderHandler}
//                             >
//                                 {t('Place Order')}
//                             </button>

//                             <button
//                                 className="btn btn-success btn-block mt-3"
//                                 onClick={proceedToPayment}
//                             >
//                                 {t('Proceed to Payment')}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </Fragment>
//     ) : (
//         <Fragment>
//             <h2>{orderComplete ? t('Order Completed') : t('Your Cart Is Empty')}</h2>
//         </Fragment>
//     );
// }



import { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next'; 
import axios from 'axios';

export default function Cart({ cartItems, setCartItems }) {
    const [orderComplete, setOrderComplete] = useState(false);
    const { t } = useTranslation(); 
    const navigate = useNavigate(); 

    // Increase Quantity
    const increaseQty = (item) => {
        if (item.product.stock > item.qty) {
            setCartItems(cartItems.map(i =>
                i.product._id === item.product._id ? { ...i, qty: i.qty + 1 } : i
            ));
        }
    };

    // Decrease Quantity
    const decreaseQty = (item) => {
        if (item.qty > 1) {
            setCartItems(cartItems.map(i =>
                i.product._id === item.product._id ? { ...i, qty: i.qty - 1 } : i
            ));
        }
    };

    // Remove Item from Cart
    const removeItem = (item) => {
        setCartItems(cartItems.filter(i => i.product._id !== item.product._id));
    };

    // Place Order
    const placeOrderHandler = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
    
        if (!user) {
            toast.error(t("Please log in to place an order"));
            navigate("/login");
            return;
        }
    
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/order`, cartItems, {
                headers: { "Content-Type": "application/json" },
            });
    
            // Clear cart from both state and localStorage
            setCartItems([]);
            localStorage.removeItem("cartItems");
    
            setOrderComplete(true);
            toast.success(t("Order Successfully Placed"));
        } catch (error) {
            toast.error(t("Failed to Place Order"));
        }
    };
    
    

    // Calculate Total Price
    const getTotalPrice = () => (
        cartItems.reduce((acc, item) => acc + item.qty * item.product.price, 0).toFixed(2)
    );

    // Navigate to Payment Page
    const proceedToPayment = () => {
        const user = JSON.parse(localStorage.getItem("user"));
    
        if (!user) {
            toast.error(t("Please log in to proceed with payment"));
            navigate("/login");
            return;
        }
    
        navigate("/payment");
    };


    return cartItems.length > 0 ? (
        <Fragment>
            <div className="container container-fluid">
                <h2 className="mt-5">
                    {t('your_cart')}: <b>{cartItems.length} {t('items')}</b>
                </h2>

                <div className="row d-flex justify-content-between">
                    <div className="col-12 col-lg-8">
                        {cartItems.map((item) => (
                            <Fragment key={item.product._id}>
                                <hr />
                                <div className="cart-item">
                                    <div className="row">
                                        <div className="col-4 col-lg-3">
                                            <img
                                                src={`http://localhost:5000${item.product.images[0].image}`}
                                                alt={item.product.name}
                                                height="90"
                                                width="115"
                                            />
                                        </div>

                                        <div className="col-5 col-lg-3">
                                            <Link to={`/product/${item.product._id}`}>
                                                {item.product.name}
                                            </Link>
                                        </div>

                                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                            <p id="card_item_price">
                                                ${item.product.price}
                                            </p>
                                        </div>

                                        <div className="d-flex">
                                            <div className="stockCounter d-inline">
                                                <button
                                                    className="btn btn-danger minus"
                                                    onClick={() => decreaseQty(item)}
                                                >
                                                    -
                                                </button>
                                                <input
                                                    type="number"
                                                    className="form-control count d-inline"
                                                    value={item.qty}
                                                    readOnly
                                                />
                                                <button
                                                    className="btn btn-primary plus"
                                                    onClick={() => increaseQty(item)}
                                                >
                                                    +
                                                </button>
                                                <button
                                                    className="btn btn-danger ms-2"
                                                    onClick={() => removeItem(item)}
                                                >
                                                    <i className="fa fa-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        ))}
                    </div>

                    <div className="col-12 col-lg-3 my-4">
                        <div id="order_summary">
                            <h4>{t('Order Summary')}</h4>
                            <hr />
                            <p>
                                {t('subtotal')}: 
                                <span className="order-summary-values">
                                    {cartItems.reduce((acc, item) => acc + item.qty, 0)} {t('units')}
                                </span>
                            </p>
                            <p>
                                {t('total_price')}: 
                                <span className="order-summary-values">
                                    ${getTotalPrice()}
                                </span>
                            </p>
                            <hr />
                            <button
                                id="checkout_btn"
                                className="btn btn-primary btn-block"
                                onClick={placeOrderHandler}
                            >
                                {t('Place Order')}
                            </button>

                            <button
                                className="btn btn-success btn-block mt-3"
                                onClick={proceedToPayment}
                            >
                                {t('Proceed to Payment')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    ) : (
        <Fragment>
            <h2>{orderComplete ? t('Order Completed') : t('Your Cart Is Empty')}</h2>
        </Fragment>
    );
}
