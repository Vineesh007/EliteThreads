// // import { Fragment, useEffect, useState } from "react";
// // import ProductCard from "../components/ProductCard";
// // import { useSearchParams } from "react-router-dom";
// // import { useTranslation } from "react-i18next";

// // export default function Home() {
// //     const { t } = useTranslation(); // Enable translations
// //     const [products, setProducts] = useState([]);
// //     const [searchParams] = useSearchParams();
// //     const API_URL = process.env.REACT_APP_API_URL; // Ensure this is set correctly

// //     useEffect(() => {
// //         fetch(`${API_URL}/products?${searchParams}`)
// //             .then((res) => {
// //                 if (!res.ok) {
// //                     throw new Error(`HTTP error! Status: ${res.status}`);
// //                 }
// //                 return res.json();
// //             })
// //             .then((res) => {
// //                 setProducts(res.products || []);
// //             })
// //             .catch((error) => console.error("Error fetching products:", error));
// //     }, [searchParams, API_URL]);

// //     return (
// //         <Fragment>
// //             <h1 id="products_heading">{t("latest_products")}</h1>
// //             <section id="products" className="container mt-5">
// //                 <div className="row">
// //                     {products.length > 0 ? (
// //                         products.map((product) => <ProductCard key={product._id} product={product} />)
// //                     ) : (
// //                         <p>{t("no_products_available")}</p>
// //                     )}
// //                 </div>
// //             </section>
// //         </Fragment>
// //     );
// // }


// import { Fragment, useEffect, useState } from "react";
// import ProductCard from "../components/ProductCard";
// import { useSearchParams } from "react-router-dom";
// import { useTranslation } from "react-i18next"; // Import translation hook
// import './Home.css';

// export default function Home() {
//     const { t } = useTranslation(); // Enable translations
//     const [products, setProducts] = useState([]);
//     const [searchParams] = useSearchParams();
//     const API_URL = process.env.REACT_APP_API_URL; // Ensure this is set correctly

//     useEffect(() => {
//         fetch(`${API_URL}/products?${searchParams}`)
//             .then((res) => {
//                 if (!res.ok) {
//                     throw new Error(`HTTP error! Status: ${res.status}`);
//                 }
//                 return res.json();
//             })
//             .then((res) => {
//                 setProducts(res.products || []);
//             })
//             .catch((error) => console.error("Error fetching products:", error));
//     }, [searchParams, API_URL]);

//     return (
//         <Fragment>
//             <h1 id="products_heading">{t("latest_products")}</h1>
//             <section id="products" className="container mt-5">
//                 <div className="row">
//                     {products.length > 0 ? (
//                         products.map((product) => <ProductCard key={product._id} product={product} />)
//                     ) : (
//                         <p>{t("No Products Available")}</p>
//                     )}
//                 </div>
//             </section>
//         </Fragment>
//     );
// }


// import { Fragment, useEffect, useState } from "react";
// import ProductCard from "../components/ProductCard";
// import { useSearchParams } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import './Home.css';

// export default function Home() {
//     const { t } = useTranslation();
//     const [products, setProducts] = useState([]);
//     const [searchParams] = useSearchParams();
//     const API_URL = process.env.REACT_APP_API_URL;

//     // Add to cart function
// const addToCart = (product) => {
//     console.log("Adding to cart:", product);  // Debug: Check product data

//     // Retrieve cart from localStorage or initialize empty array
//     let cart = JSON.parse(localStorage.getItem('cart')) || [];
//     console.log("Current cart:", cart);  // Debug: Check current cart state

//     // Check if product already exists in the cart
//     const existingProductIndex = cart.findIndex(item => item._id === product._id);

//     if (existingProductIndex > -1) {
//         // If product exists, increase quantity
//         cart[existingProductIndex].quantity += 1;
//     } else {
//         // Else, add new product with quantity 1
//         const productToAdd = {
//             _id: product._id,
//             name: product.name,
//             price: product.price,
//             image: product.images[0].image,  // Ensure image is set correctly
//             quantity: 1
//         };
//         cart.push(productToAdd);
//     }

//     // Save updated cart to localStorage
//     localStorage.setItem('cart', JSON.stringify(cart));

//     // Confirm action to the user
//     alert(`${product.name} added to cart!`);

//     console.log("Updated cart:", JSON.parse(localStorage.getItem('cart')));  // Debug: Check updated cart state
// };



//     useEffect(() => {
//         fetch(`${API_URL}/products?${searchParams}`)
//             .then((res) => {
//                 if (!res.ok) {
//                     throw new Error(`HTTP error! Status: ${res.status}`);
//                 }
//                 return res.json();
//             })
//             .then((res) => {
//                 setProducts(res.products || []);
//             })
//             .catch((error) => console.error("Error fetching products:", error));
//     }, [searchParams, API_URL]);

//     return (
//         <Fragment>
//             <h1 id="products_heading">{t("latest_products")}</h1>
//             <section id="products" className="container mt-5">
//                 <div className="row">
//                     {products.length > 0 ? (
//                         products.map((product) => (
//                             <ProductCard
//                                 key={product._id}
//                                 product={product}
//                                 addToCart={addToCart}  // Pass addToCart function as prop
//                             />
//                         ))
//                     ) : (
//                         <p>{t("No Products Available")}</p>
//                     )}
//                 </div>
//             </section>
//         </Fragment>
//     );
// }








// import { Fragment, useEffect, useState } from "react";
// import ProductCard from "../components/ProductCard";
// import { useSearchParams } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { toast } from 'react-toastify';
// import './Home.css';

// export default function Home({ cartItems, setCartItems }) {
//     const { t } = useTranslation();
//     const [products, setProducts] = useState([]);
//     const [searchParams] = useSearchParams();
//     const API_URL = process.env.REACT_APP_API_URL;

//     // Retrieve logged-in user data from localStorage
//     const user = JSON.parse(localStorage.getItem("user"));
    
//     //Logout Function
//     const handleLogout = () => {
//         localStorage.removeItem("user");
//         window.location.reload();
//     };

//     // Add to cart function
//     const addToCart = (product) => {
//         // Ensure cartItems is always an array
//         const currentCart = Array.isArray(cartItems) ? cartItems : [];
    
//         const itemExist = currentCart.find(item => item.product._id === product._id);
    
//         if (itemExist) {
//             // Update the quantity if the product is already in the cart
//             setCartItems(prevItems => {
//                 const updatedCart = prevItems.map(item =>
//                     item.product._id === product._id
//                         ? { ...item, qty: item.qty + 1 } // Increase quantity
//                         : item
//                 );
    
//                 localStorage.setItem("cartItems", JSON.stringify(updatedCart)); // Sync with localStorage
//                 return updatedCart;
//             });
//         } else {
//             const newItem = { product, qty: 1 }; // Initialize with qty: 1
    
//             setCartItems(prevItems => {
//                 const updatedCart = [...(prevItems || []), newItem]; // Ensure prevItems is an array
    
//                 localStorage.setItem("cartItems", JSON.stringify(updatedCart)); // Sync with localStorage
//                 return updatedCart;
//             });
//         }
    
//         toast.success(t("Added To Cart"));
//     };
    
    
    

//     useEffect(() => {
//         fetch(`${API_URL}/products?${searchParams}`)
//             .then((res) => {
//                 if (!res.ok) {
//                     throw new Error(`HTTP error! Status: ${res.status}`);
//                 }
//                 return res.json();
//             })
//             .then((res) => {
//                 setProducts(res.products || []);
//             })
//             .catch((error) => console.error("Error fetching products:", error));
//     }, [searchParams, API_URL]);

//     return (
//         <Fragment>
//     <div className="home-container">
//         {/* Welcome message */}
//         {user && (
//             <h2 className="welcome-message">Welcome, {user.name}!</h2>
//         )}
        
//         <h1 id="products_heading">{t("latest_products")}</h1>
//         <section id="products" className="container mt-5">
//             <div className="row">
//                 {products.length > 0 ? (
//                     products.map((product) => (
//                         <ProductCard
//                             key={product._id}
//                             product={product}
//                             addToCart={addToCart}  // Pass addToCart function as prop
//                         />
//                     ))
//                 ) : (
//                     <p>{t("No Products Available")}</p>
//                 )}
//             </div>
//         </section>
//     </div>
// </Fragment>

//     );
// }


import { Fragment, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify';
import './Home.css';
import axios from 'axios';

export default function Home({ cartItems, setCartItems }) {
    const { t } = useTranslation();
    const [products, setProducts] = useState([]);
    const [searchParams] = useSearchParams();
    const API_URL = process.env.REACT_APP_API_URL;

    // Retrieve logged-in user data from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    
    // Logout Function
    const handleLogout = () => {
        localStorage.removeItem("user");
        window.location.reload();
    };

    // Add to cart function
    const addToCart = (product) => {
        const currentCart = Array.isArray(cartItems) ? cartItems : [];
        const itemExist = currentCart.find(item => item.product._id === product._id);
    
        if (itemExist) {
            setCartItems(prevItems => {
                const updatedCart = prevItems.map(item =>
                    item.product._id === product._id
                        ? { ...item, qty: item.qty + 1 }
                        : item
                );
    
                localStorage.setItem("cartItems", JSON.stringify(updatedCart));
                return updatedCart;
            });
        } else {
            const newItem = { product, qty: 1 };
    
            setCartItems(prevItems => {
                const updatedCart = [...(prevItems || []), newItem];
    
                localStorage.setItem("cartItems", JSON.stringify(updatedCart));
                return updatedCart;
            });
        }
    
        toast.success(t("Added To Cart"));
    };

    useEffect(() => {
        fetch(`${API_URL}/products?${searchParams}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then((res) => {
                setProducts(res.products || []);
            })
            .catch((error) => console.error("Error fetching products:", error));
    }, [searchParams, API_URL]);

    // Debugging Payment Intent API Call
    const handlePaymentIntent = async () => {
        try {
            const response = await axios.post(
                `${API_URL}/create-payment-intent`,
                { amount: 1000 },
                { withCredentials: true }
            );
            console.log("Payment Intent Response:", response.data);
        } catch (error) {
            console.error("Payment Intent Error:", error.response?.data || error.message);
        }
    };

    return (
        <Fragment>
            <div className="home-container">
                {user && (
                    <h2 className="welcome-message">Welcome, {user.name}!</h2>
                )}
                
                <h1 id="products_heading">{t("latest_products")}</h1>
                <section id="products" className="container mt-5">
                    <div className="row">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                    addToCart={addToCart}
                                />
                            ))
                        ) : (
                            <p>{t("No Products Available")}</p>
                        )}
                    </div>
                </section>
                {/* <button onClick={handlePaymentIntent} className="btn btn-primary mt-3">Test Payment Intent</button> */}
            </div>
        </Fragment>
    );
}
