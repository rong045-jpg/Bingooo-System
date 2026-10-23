import React from "react";
import { Routes, Route, ScrollRestoration } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import HomePage from "./pages/public/HomePage";
import MenuPage from "./pages/public/MenuPage";
import AboutPage from "./pages/public/AboutPage";

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const NotFound = () => (
  <main className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
    <p className="text-xs font-bold tracking-[0.25em] text-gray-500">
      PAGE NOT FOUND
    </p>
    <h1 className="mt-4 text-5xl font-extrabold">404</h1>
    <p className="mt-4 text-sm text-gray-500">
      Sorry, we couldn't find that page.
    </p>
    <a
      href="/"
      className="mt-7 rounded-full bg-black px-7 py-3.5 text-sm font-semibold text-white"
    >
      Back Home
    </a>
  </main>
);

const App = () => {
  return (
    <div className="min-h-screen bg-white text-[#171717]">
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <PageTransition>
              <HomePage />
            </PageTransition>
          }
        />
        <Route
          path="/menu"
          element={
            <PageTransition>
              <MenuPage />
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition>
              <AboutPage />
            </PageTransition>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
