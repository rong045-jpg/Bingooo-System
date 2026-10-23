// src/context/LanguageContext.jsx
import React, { createContext, useState, useContext } from "react";

const translations = {
  en: {
    welcome: "Welcome",
    menu: "Menu",
    cart: "Cart",
    checkout: "Checkout",
    payNow: "Pay Now",
    login: "Login",
    dashboard: "Dashboard",
  },
  km: {
    welcome: "សូមស្វាគមន៍",
    menu: "ម៉ឺនុយ",
    cart: "កន្ត្រក",
    checkout: "បង់ប្រាក់",
    payNow: "បង់ប្រាក់ឥឡូវនេះ",
    login: "ចូល",
    dashboard: "ផ្ទាំងគ្រប់គ្រង",
  },
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("en");

  const toggleLanguage = () => {
    setLang((prev) => (prev === "en" ? "km" : "en"));
  };

  const t = (key) => translations[lang]?.[key] || key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
