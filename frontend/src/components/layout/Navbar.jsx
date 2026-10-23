import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { name: "Home", path: "/" },
  { name: "Menu", path: "/menu" },
  { name: "About", path: "/about" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `rounded-xl px-4 py-3 text-sm font-semibold transition ${
      isActive(path)
        ? "bg-black text-white"
        : "text-gray-600 hover:bg-gray-100 hover:text-black"
    }`;

  return (
    <motion.header
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-xl"
    >
      <nav className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-3"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-lg font-extrabold text-white">
            B
          </span>

          <span>
            <span className="block text-lg font-extrabold tracking-[0.12em]">
              BINGOOO CAP
            </span>
            <span className="block text-[9px] tracking-[0.2em] text-gray-500">
              DRINKS · ICE CREAM · SNACKS
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={linkClass(link.path)}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <Link
          to="/menu"
          className="hidden items-center gap-3 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 md:inline-flex"
        >
          Explore Menu <span>↗</span>
        </Link>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100 md:hidden"
        >
          {menuOpen ? (
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="m6 6 12 12M18 6 6 18"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M4 7h16M4 12h16M4 17h16"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </nav>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-gray-100 bg-white md:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5">
              {links.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className={`block ${linkClass(link.path)}`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <Link
                to="/menu"
                onClick={() => setMenuOpen(false)}
                className="mt-2 rounded-full bg-black px-5 py-3.5 text-center text-sm font-semibold text-white"
              >
                Explore Menu ↗
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
