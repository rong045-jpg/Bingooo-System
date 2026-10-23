import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-[#111111] text-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link to="/" className="text-2xl font-extrabold tracking-[0.12em]">
              BINGOOO CAP
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-7 text-gray-400">
              Your everyday destination for delicious drinks, creamy ice cream,
              irresistible sundaes, and little moments of happiness.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold">Explore</h3>
            <div className="mt-5 flex flex-col items-start gap-4 text-sm text-gray-400">
              <Link to="/" className="transition hover:text-white">
                Home
              </Link>
              <Link to="/menu" className="transition hover:text-white">
                Our Menu
              </Link>
              <Link to="/about" className="transition hover:text-white">
                About Us
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold">Our Favorites</h3>
            <div className="mt-5 flex flex-col items-start gap-4 text-sm text-gray-400">
              <Link
                to="/menu?category=Coffee"
                className="transition hover:text-white"
              >
                Coffee & Drinks
              </Link>
              <Link
                to="/menu?category=Ice%20Cream"
                className="transition hover:text-white"
              >
                Ice Cream & Sundaes
              </Link>
              <Link
                to="/menu?category=Fruit%20Drinks"
                className="transition hover:text-white"
              >
                Fruit Drinks
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Bingooo CAP. All rights reserved.
          </p>

          <motion.div whileHover={{ x: 4 }}>
            <Link to="/menu" className="text-xs font-semibold text-white">
              Find your next favorite ↗
            </Link>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
