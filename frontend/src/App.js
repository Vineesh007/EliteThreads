// import "./App.css";
// import Home from "./pages/Home";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import ProductDetail from "./pages/ProductDetail";
// import { useState } from "react";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Cart from "./pages/Cart";
// import { useTranslation } from "react-i18next"; // Import translation hook

// function App() {
//   const [cartItems, setCartItems] = useState([]);
//   const { t } = useTranslation(); // Use the translation hook

//   return (
//     <div className="App">
//       <Router>
//         <div>
//           <ToastContainer theme="dark" position="top-center" />
//           <Header cartItems={cartItems} /> {/* Header now includes language selector */}
//           {/* Remove the separate LanguageSelector component as it's integrated in Header */}

//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/search" element={<Home />} />
//             <Route
//               path="/product/:id"
//               element={<ProductDetail cartItems={cartItems} setCartItems={setCartItems} />}
//             />
//             <Route
//               path="/cart"
//               element={<Cart cartItems={cartItems} setCartItems={setCartItems} />}
//             />
//           </Routes>
//         </div>
//       </Router>
//       <Footer />
//     </div>
//   );
// }

// export default App;

// import "./App.css";
// import Home from "./pages/Home";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import ProductDetail from "./pages/ProductDetail";
// import Cart from "./pages/Cart";
// import { useState, useEffect } from "react";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useTranslation } from "react-i18next"; // Import translation hook

// function App() {
//   const [cartItems, setCartItems] = useState([]);
//   const { t } = useTranslation(); // Enable translations

//   // Persist cartItems in localStorage across sessions
//   useEffect(() => {
//     const savedCart = JSON.parse(localStorage.getItem("cartItems"));
//     if (savedCart) {
//       setCartItems(savedCart);
//     }
//   }, []);

//   // Update localStorage whenever cartItems change
//   useEffect(() => {
//     if (cartItems.length > 0) {
//       localStorage.setItem("cartItems", JSON.stringify(cartItems));
//     }
//   }, [cartItems]);

//   return (
//     <div className="App">
//       <Router>
//         <div>
//           <ToastContainer theme="dark" position="top-center" />
//           <Header cartItems={cartItems} /> {/* Header now includes language selector */}

//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/search" element={<Home />} />
//             <Route
//               path="/product/:id"
//               element={<ProductDetail cartItems={cartItems} setCartItems={setCartItems} />}
//             />
//             <Route
//               path="/cart"
//               element={<Cart cartItems={cartItems} setCartItems={setCartItems} />}
//             />
//           </Routes>
//         </div>
//       </Router>
//       <Footer />
//     </div>
//   );
// }

// export default App;
// src/App.js
import "./App.css";
import React from "react";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from './components/Login';
import Signup from './components/Signup';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next"; // Import translation hook
import Payment from './components/Payment';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminRoute from './components/AdminRoute';


function App() {
  const [cartItems, setCartItems] = useState(() => { 
    const savedCart = JSON.parse(localStorage.getItem("cartItems"));
    return savedCart || [];
});


  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="App">
      <Router>
        <ToastContainer theme="dark" position="top-center" autoClose={3000} />
        <Header cartItems={cartItems} />
        <div className="content">

        <Routes>
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route element={<AdminRoute />}/>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home cartItems={cartItems} setCartItems={setCartItems}  />} />
          <Route path="/payment" element={<Payment cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/product/:id" element={<ProductDetail cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
        </Routes>
        </div>
      </Router>
      <Footer />
    </div>
  );
}


export default App;
