// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
// import Backend from 'i18next-http-backend';

// i18n
//   .use(Backend) // Load translations from JSON files
//   .use(LanguageDetector) // Detect user language
//   .use(initReactI18next) // Integrate with React
//   .init({
//     fallbackLng: "en", // Default language
//     debug: true, // Set to false in production
//     interpolation: {
//       escapeValue: false, // React already escapes values
//     },
//     resources: {
//       en: {
//         translation: {
//           welcome: "Welcome to Elite Threads",
//           home: "Home",
//           products: "Products",
//           contact: "Contact Us",
//         },
//       },
//       ta: {
//         translation: {
//           welcome: "எலிட் திரெட்ஸிற்கு வரவேற்கிறோம்",
//           home: "முகப்பு",
//           products: "தயாரிப்புகள்",
//           contact: "தொடர்பு கொள்ளுங்கள்",
//         },
//       },
//     },
//   });

// export default i18n;


// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";
// import LanguageDetector from "i18next-browser-languagedetector";
// import Backend from "i18next-http-backend";

// i18n
//   .use(Backend)
//   .use(LanguageDetector)
//   .use(initReactI18next)
//   .init({
//     fallbackLng: "en",
//     debug: true,
//     interpolation: { escapeValue: false },
//     resources: {
//       en: {
//         translation: {
//           welcome: "Welcome to Elite Threads",
//           home: "Home",
//           products: "Products",
//           contact: "Contact Us",
//           cart: "Shopping Cart",
//           checkout: "Checkout",
//         },
//       },
//       ta: {
//         translation: {
//           welcome: "எலிட் திரெட்ஸிற்கு வரவேற்கிறோம்",
//           home: "முகப்பு",
//           products: "தயாரிப்புகள்",
//           contact: "தொடர்பு கொள்ளுங்கள்",
//           cart: "வாங்கும் வண்டி",
//           checkout: "சரிபார்த்து செலுத்து",
//         },
//       },
//       hi: {
//         translation: {
//           welcome: "एलीट थ्रेड्स में आपका स्वागत है",
//           home: "होम",
//           products: "उत्पाद",
//           contact: "संपर्क करें",
//           cart: "खरीदारी की टोकरी",
//           checkout: "चेकआउट",
//         },
//       },
//     },
//   });

// export default i18n;

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: true,
    interpolation: { escapeValue: false },
    resources: {
      en: {
        translation: {
          welcome: "Welcome to Elite Threads",
          home: "Home",
          products: "Products",
          contact: "Contact Us",
          cart: "Shopping Cart",
          checkout: "Checkout",
          latest_products: "Latest Products",
          no_products_available: "No products available",
        },
      },
      ta: {
        translation: {
          welcome: "எலிட் திரெட்ஸிற்கு வரவேற்கிறோம்",
          home: "முகப்பு",
          products: "தயாரிப்புகள்",
          contact: "தொடர்பு கொள்ளுங்கள்",
          cart: "வாங்கும் வண்டி",
          checkout: "சரிபார்த்து செலுத்து",
          latest_products: "சமீபத்திய தயாரிப்புகள்",
          no_products_available: "கிடைக்கும் தயாரிப்புகள் இல்லை",
        },
      },
      hi: {
        translation: {
          welcome: "एलीट थ्रेड्स में आपका स्वागत है",
          home: "होम",
          products: "उत्पाद",
          contact: "संपर्क करें",
          cart: "खरीदारी की टोकरी",
          checkout: "चेकआउट",
          latest_products: "नवीनतम उत्पाद",
          no_products_available: "कोई उत्पाद उपलब्ध नहीं है",
        },
      },
    },
  });

export default i18n;

