// import { Link } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';

// export default function ProductCard({ product }) {
//     const { t } = useTranslation();

//     return (
//         <div className="col-sm-12 col-md-6 col-lg-3 my-3">
//             <div className="card p-3 rounded">
//                 <img
//                     className="card-img-top mx-auto"
//                     src={product.images[0].image}
//                     alt={product.name}
//                 />
//                 <div className="card-body d-flex flex-column">
//                     <h5 className="card-title">
//                         <Link to={"/product/" + product._id}>{product.name}</Link>
//                     </h5>
//                     <div className="ratings mt-auto">
//                         <div className="rating-outer">
//                             <div
//                                 className="rating-inner"
//                                 style={{ width: `${(product.ratings / 5) * 100}%` }}
//                             ></div>
//                         </div>
//                     </div>
//                     <p className="card-text">${product.price}</p>
//                     <Link to={"/product/" + product._id} id="view_btn" className="btn btn-block">
//                         {t('view_details')}
//                     </Link>
//                     <button className="btn btn-primary mt-2">{t('add_to_cart')}</button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// import { Link } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import './ProductCard.css'; // Import the CSS for styling

// export default function ProductCard({ product }) {
//     const { t } = useTranslation();

//     return (
//         <div className="col-sm-12 col-md-6 col-lg-3 my-3">
//             <div className="card p-3 rounded shadow-lg product-card">
//                 <img
//                     className="card-img-top mx-auto"
//                     src={product.images[0].image}
//                     alt={product.name}
//                     style={{ height: '200px', objectFit: 'contain' }}
//                 />
//                 <div className="card-body d-flex flex-column">
//                     <h5 className="card-title">
//                         <Link to={`/product/${product._id}`} className="product-link">{product.name}</Link>
//                     </h5>
//                     <div className="ratings mt-auto">
//                         <div className="rating-outer">
//                             <div
//                                 className="rating-inner"
//                                 style={{ width: `${(product.ratings / 5) * 100}%` }}
//                             ></div>
//                         </div>
//                     </div>
//                     <p className="card-text price">${product.price}</p>
//                     <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block btn-info">{t('View Details')}</Link>
//                     <button className="btn btn-primary mt-2 add-to-cart-btn">{t('Add To Cart')}</button>
//                 </div>
//             </div>
//         </div>
//     );
// }

import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './ProductCard.css'; // Import the CSS for styling

export default function ProductCard({ product, addToCart }) {
    const { t } = useTranslation();

    return (
        <div className="col-sm-12 col-md-6 col-lg-3 my-3">
            <div className="card p-3 rounded shadow-lg product-card">
                <img
                    className="card-img-top mx-auto"
                    src={`http://localhost:5000${product.images[0]?.image}`} 
                    alt={product.name}
                    style={{ height: '200px', objectFit: 'contain' }}
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                        <Link to={`/product/${product._id}`} className="product-link">{product.name}</Link>
                    </h5>
                    <div className="ratings mt-auto">
                        <div className="rating-outer">
                            <div
                                className="rating-inner"
                                style={{ width: `${(product.ratings / 5) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                    <p className="card-text price">${product.price}</p>
                    <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block btn-info">
                        {t('View Details')}
                    </Link>
                    <button
                        className="btn btn-success mt-2 add-to-cart-btn"
                        onClick={() => addToCart(product)}
                        >
                         {t('Add To Cart')}
                    </button>

                </div>
            </div>
        </div>
    );
}

