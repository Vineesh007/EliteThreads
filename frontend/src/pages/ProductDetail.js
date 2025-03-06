// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';

// export default function ProductDetail({ cartItems, setCartItems }) {
//     const [product, setProduct] = useState(null);
//     const [qty, setQty] = useState(1);
//     const { id } = useParams(); // Getting the product id from URL params

//     // Fetch product details when the component mounts or the `id` changes
//     useEffect(() => {
//         console.log(`Fetching product with ID: ${id}`); // Log the product id
//         fetch(process.env.REACT_APP_API_URL + '/product/' + id) // Replace with your API endpoint
//             .then(res => res.json())
//             .then(res => {
//                 console.log('Fetched product:', res); // Log the fetched product data
//                 setProduct(res.product); // Set the product data into state
//             })
//             .catch(err => {
//                 console.error('Error fetching product:', err); // Log any errors
//                 toast.error("Failed to fetch product details.");
//             });
//     }, [id]); // Dependency array ensures the effect runs when `id` changes

//     // Add product to the cart
//     function addToCart() {
//         const itemExist = cartItems.find(item => item.product._id === product._id);
//         if (!itemExist) {
//             const newItem = { product, qty };
//             setCartItems(state => [...state, newItem]);
//             toast.success("Cart item added successfully!");
//         }
//     }

//     // Increase product quantity
//     function increaseQty() {
//         if (product.stock === qty) {
//             return;
//         }
//         setQty(state => state + 1);
//     }

//     // Decrease product quantity
//     function decreaseQty() {
//         if (qty > 1) {
//             setQty(state => state - 1);
//         }
//     }

//     return product ? (
//         <div className="container container-fluid">
//             <div className="row f-flex justify-content-around">
//                 <div className="col-12 col-lg-5 img-fluid" id="product_image">
//                     <img src={product.images[0].image} alt={product.name} height="500" width="500" />
//                 </div>

//                 <div className="col-12 col-lg-5 mt-5">
//                     <h3>{product.name}</h3>
//                     <p id="product_id">Product #{product._id}</p>

//                     <hr />

//                     <div className="rating-outer">
//                         <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
//                     </div>

//                     <hr />

//                     <p id="product_price">${product.price}</p>
//                     <div className="stockCounter d-inline">
//                         <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

//                         <input type="number" className="form-control count d-inline" value={qty} readOnly />

//                         <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
//                     </div>
//                     <button type="button" onClick={addToCart} disabled={product.stock === 0} id="cart_btn" className="btn btn-primary d-inline ml-4">
//                         Add to Cart
//                     </button>

//                     <hr />

//                     <p>Status: <span id="stock_status" className={product.stock > 0 ? 'text-success' : 'text-danger'}>
//                         {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
//                     </span></p>

//                     <hr />

//                     <h4 className="mt-2">Description:</h4>
//                     <p>{product.description}</p>
//                     <hr />
//                     <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>
//                 </div>
//             </div>
//         </div>
//     ) : (
//         <div>Loading...</div> // Display loading message until product is fetched
//     );
// }

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import'./ProductDetail.css';
import { useTranslation } from 'react-i18next'; // Import translation hook

export default function ProductDetail({ cartItems, setCartItems }) {
    const [product, setProduct] = useState(null);
    const [qty, setQty] = useState(1);
    const { id } = useParams(); // Getting the product id from URL params
    const { t } = useTranslation(); // Enable translations

    // Fetch product details when the component mounts or the `id` changes
    useEffect(() => {
        console.log(`Fetching product with ID: ${id}`); // Log the product id
        fetch(process.env.REACT_APP_API_URL + '/product/' + id) // Replace with your API endpoint
            .then(res => res.json())
            .then(res => {
                console.log('Fetched product:', res); // Log the fetched product data
                setProduct(res.product); // Set the product data into state
            })
            .catch(err => {
                console.error('Error fetching product:', err); // Log any errors
                toast.error(t("failed to fetch product")); // Use translation for error message
            });
    }, [id]); // Dependency array ensures the effect runs when `id` changes

    // Add product to the cart
    function addToCart() {
        const itemExist = cartItems.find(item => item.product._id === product._id);
        if (itemExist) {
            // Update the quantity if the product is already in the cart
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.product._id === product._id
                        ? { ...item, qty: item.qty + qty }
                        : item
                )
            );
        } else {
            const newItem = { product, qty };
            setCartItems(prevItems => [...prevItems, newItem]);
        }
        toast.success(t("Added To Cart"));
    }
    

    // // Increase product quantity
    // function increaseQty() {
    //     if (product.stock === qty) {
    //         return;
    //     }
    //     setQty(state => state + 1);
    // }

    // Increase product quantity
// function increaseQty() {
//     if (qty >= product.stock) {
//         toast.error(t("Insufficient availability")); // Show error message
//         return;
//     }
//     setQty(state => state + 1);
// }


//     // Decrease product quantity
//     function decreaseQty() {
//         if (qty > 1) {
//             setQty(state => state - 1);
//         }
//     }

function increaseQty() {
    if (qty < product.stock) {
        setQty(prevQty => prevQty + 1);
    } else {
        toast.error(t("Insufficient availability")); // Show error message
    }
}

function decreaseQty() {
    if (qty > 1) {
        setQty(prevQty => prevQty - 1);
    }
}


    return product ? (
        <div class="prod">
            <div className="container container-fluid">
                <div className="row f-flex justify-content-around">
                    <div className="col-12 col-lg-5 img-fluid" id="product_image">
                        
                        <img src={`http://localhost:5000${product.images[0]?.image}`} alt={product.name} height="500" width="500" />
                    </div>

                    <div className="col-12 col-lg-5 mt-5">
                        <h3>{product.name}</h3>
                        <p id="product_id">{t("product_id")}: {product._id}</p>

                        <hr />

                        <div className="rating-outer">
                            <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                        </div>

                        <hr />

                        <p id="product_price">${product.price}</p>
                        <div className="stockCounter d-inline">
                            <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                            <input type="number" className="form-control count d-inline" value={qty} readOnly />

                            <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                        </div>
                        <button type="button" onClick={addToCart} disabled={product.stock === 0} id="cart_btn" className="btn btn-primary d-inline ml-4">
                            {t("Add To Cart")}
                        </button>

                        <hr />

                        {/* /* <p>{t("status")}: <span id="stock_status" className={product.stock > 0 ? 'text-success' : 'text-danger'}>
                            {product.stock > 0 ? t("In Stock") : t("Out Of Stock")}
                        </span></p> */}
<p>
    {t("status")}: 
    <span id="stock_status" className={product.stock - qty > 0 ? 'text-success' : 'text-danger'}>
        {product.stock - qty > 0 ? t("In Stock") : t("Out Of Stock")}
    </span>
    {product.stock - qty > 0 && (
        <span className="text-muted"> ({t("Only")} {product.stock - qty} {t("left in stock")})</span>
    )}
</p>


                        <hr />

                        <h4 className="mt-2">{t("description")}</h4>
                        <p>{product.description}</p>
                        <hr />
                        <p id="product_seller mb-3">{t("Sold By")}: <strong>{product.seller}</strong></p>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div>{t("loading")}</div> // Display loading message until product is fetched
    );
}
