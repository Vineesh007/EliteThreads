// import React, { useEffect, useState } from "react";
// import './Navbar.css'
// import axios from "axios";
// import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { FaShoppingCart, FaUser } from "react-icons/fa";

// export default function Header({ cartItems }) {
//   const { i18n } = useTranslation();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const languages = [
//     { code: "en", name: "English" },
//     { code: "ta", name: "தமிழ் (Tamil)" },
//     { code: "hi", name: "हिन्दी (Hindi)" },
//   ];

//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) {
//       setUser(storedUser);
//     }
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });

//       // Clear user session in frontend
//       localStorage.removeItem('user');
//       setUser(null);

//       // Redirect to login page
//       navigate('/login');
//     } catch (error) {
//       console.error('Logout failed', error);
//     }
//   };

//   // Hide cart on login/signup pages
//   const hideCart = location.pathname === "/login" || location.pathname === "/signup";

//   return (
//     <header className="navbar navbar-expand-lg fixed-top shadow-sm">
//       <div className="container-fluid">
//         {/* Logo */}
//         <Link className="navbar-brand d-flex align-items-center" to="/">
//           <img
//             src="/images/logo.png"
//             alt="Elite Threads Logo"
//             className="logo me-2"
//             style={{ height: "80px" }}
//           />
//         </Link>

//         {/* Navbar Toggler */}
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarContent"
//           aria-controls="navbarContent"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         {/* Collapsible Menu */}
//         <div className="collapse navbar-collapse" id="navbarContent">
//           <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
//             <li className="nav-item">
//               <NavLink to="/" className="nav-link">Home</NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink to="/about" className="nav-link">About Us</NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink to="/contact" className="nav-link">Contact</NavLink>
//             </li>

//             {/* Language Selector */}
//             <li className="nav-item">
//               <select
//                 onChange={(e) => i18n.changeLanguage(e.target.value)}
//                 value={i18n.language}
//                 className="form-select form-select-sm w-auto ms-3"
//               >
//                 {languages.map((lang) => (
//                   <option key={lang.code} value={lang.code}>
//                     {lang.name}
//                   </option>
//                 ))}
//               </select>
//             </li>

//             {/* Cart Link */}
//             {!hideCart && (
//               <li className="nav-item cart">
//                 <NavLink to="/cart" className="nav-link ms-3">
//                   <FaShoppingCart className="me-1" /> Cart ({cartItems.length})
//                 </NavLink>
//               </li>
//             )}

//             {/* Login/Logout Button */}
//             <li className="nav-item">
//               {user ? (
//                 <button onClick={handleLogout} className="nav-link btn btn-link ms-3">
//                   <FaUser className="me-1" /> Logout
//                 </button>
//               ) : (
//                 <NavLink to="/login" className="nav-link ms-3">
//                   <FaUser className="me-1" /> Login
//                 </NavLink>
//               )}
//             </li>
//           </ul>
//         </div>
//       </div>
//     </header>
//   );
// }
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import "./Navbar.css";

export default function Header({ cartItems }) {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const languages = [
    { code: "en", name: "English" },
    { code: "ta", name: "\u0ba4\u0bae\u0bbf\u0bb4\u0bcd (Tamil)" },
    { code: "hi", name: "\u0939\u093f\u0928\u094d\u0926\u0940 (Hindi)" },
  ];

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
      localStorage.removeItem("user");
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const hideCart = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <header className="navbar glass-navbar fixed-top shadow-lg">
      <div className="nav-container">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <img src="/images/logo.png" alt="Elite Threads Logo" className="logo" />
        </Link>

        {/* Navigation Links */}
        <nav className="nav-links">
          <NavLink to="/" className="nav-item">Home</NavLink>
          <NavLink to="/about" className="nav-item">About Us</NavLink>
          <NavLink to="/contact" className="nav-item">Contact</NavLink>
        </nav>

        {/* Right Section */}
        <div className="right-section">
          {/* Language Selector */}
          <select
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            value={i18n.language}
            className="language-selector"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>

          {/* Cart */}
          {!hideCart && (
            <NavLink to="/cart" className="cart-icon">
              <FaShoppingCart /> <span>{cartItems.length}</span>
            </NavLink>
          )}

          {/* User Section */}
          {user ? (
            <button onClick={handleLogout} className="logout-btn">
              <FaUser /> Logout
            </button>
          ) : (
            <NavLink to="/login" className="login-btn">
              <FaUser /> Login
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
}