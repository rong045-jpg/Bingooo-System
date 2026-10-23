import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Reveal from "../../components/ui/Reveal";

const categories = [
  {
    name: "Coffee",
    icon: "☕",
    subtitle: "Your daily cup of happiness",
  },
  {
    name: "Ice Cream & Sundaes",
    icon: "🍨",
    subtitle: "Creamy scoops and sweet toppings",
  },
  {
    name: "Milk Drinks",
    icon: "🥛",
    subtitle: "Smooth, creamy and refreshing",
  },
  {
    name: "Fruit Drinks",
    icon: "🍓",
    subtitle: "Fresh flavors in every sip",
  },
];
const products = [
  {
    name: "Signature Iced Latte",
    category: "Coffee",
    price: "$4.50",
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=700&auto=format&fit=crop",
    tag: "BESTSELLER",
  },
  {
    name: "Chocolate Ice Cream",
    category: "Ice Cream",
    price: "$3.50",
    image:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=700&auto=format&fit=crop",
    tag: "",
  },
  {
    name: "Strawberry Sundae",
    category: "Sundaes",
    price: "$5.50",
    image:
      "https://images.unsplash.com/photo-1560008581-09826d1de69e?q=80&w=700&auto=format&fit=crop",
    tag: "FAN FAVORITE",
  },
  {
    name: "Mango Smoothie",
    category: "Fruit Drinks",
    price: "$4.75",
    image:
      "https://images.unsplash.com/photo-1546173159-315724a31696?q=80&w=700&auto=format&fit=crop",
    tag: "",
  },
];

const collections = [
  {
    title: "Ice Cream Happiness",
    subtitle: "COOL & CREAMY",
    link: "/menu?category=Ice%20Cream",
    image:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=700&auto=format&fit=crop",
  },
  {
    title: "Milk Drinks & More",
    subtitle: "SIP SOMETHING GOOD",
    link: "/menu?category=Milk%20Drinks",
    image:
      "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=700&auto=format&fit=crop",
  },
  {
    title: "Fruity Refreshment",
    subtitle: "FRESH EVERY DAY",
    link: "/menu?category=Fruit%20Drinks",
    image:
      "https://images.unsplash.com/photo-1546173159-315724a31696?q=80&w=700&auto=format&fit=crop",
  },
];

const HomePage = () => {
  return (
    <main className="overflow-hidden bg-white text-[#171717]">
      {/* HERO */}
      <section className="bg-[#F6F6F4]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 md:py-24 lg:px-12 lg:py-28">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs font-bold tracking-[0.25em] text-gray-500"
            >
              WELCOME TO BINGOOO CHBAR AMPOV​
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 text-5xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl"
            >
              Something
              <br />
              <span className="font-serif italic font-normal text-gray-500">
                good awaits.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-lg text-base leading-8 text-gray-500"
            >
              From your favorite coffee to creamy ice cream and refreshing fruit
              drinks, discover something delicious for every mood.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                to="/menu"
                className="rounded-full bg-black px-7 py-4 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                Explore Our Menu <span className="ml-2">↗</span>
              </Link>

              <Link
                to="/about"
                className="rounded-full border border-gray-300 px-7 py-4 text-sm font-semibold transition hover:border-black"
              >
                Our Story
              </Link>
            </motion.div>

            <div className="mt-10 border-t border-gray-200 pt-6">
              <p className="text-xs tracking-[0.18em] text-gray-500">
                COFFEE · ICE CREAM · DRINKS · DESSERTS
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=1100&auto=format&fit=crop"
              alt="Delicious ice cream treats"
              className="image-hover h-[360px] w-full rounded-2xl object-cover sm:h-[480px]"
            />

            <div className="absolute -bottom-5 left-4 rounded-xl bg-white p-5 shadow-xl sm:-left-5">
              <p className="text-[10px] tracking-[0.2em] text-gray-500">
                YOUR LITTLE MOMENT
              </p>
              <p className="mt-1 font-serif text-xl italic">Made to enjoy.</p>
            </div>

            <div className="absolute right-4 top-4 rounded-full bg-white px-4 py-3 text-xs font-semibold shadow-sm">
              Sweetness in every scoop
            </div>
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 md:py-16 lg:px-12">
        <Reveal>
          <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-500">
                EXPLORE OUR MENU
              </p>

              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-black sm:text-3xl md:text-4xl">
                Find Your Favorite<span className="text-gray-400">.</span>
              </h2>

              <p className="mt-2 max-w-md text-xs leading-5 text-gray-500 sm:text-sm">
                Something delicious for every mood.
              </p>
            </div>

            <Link
              to="/menu"
              className="mb-1 hidden shrink-0 items-center gap-2 text-sm font-semibold text-black transition hover:gap-3 sm:inline-flex"
            >
              View all <span>↗</span>
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.4,
                delay: index * 0.06,
                ease: "easeOut",
              }}
              whileHover={{ y: -4 }}
              className="h-full"
            >
              <Link
                to={`/menu?category=${encodeURIComponent(category.name)}`}
                className="group flex h-full min-h-[150px] flex-col rounded-2xl border border-gray-200 bg-white p-4 transition-all duration-300 hover:border-black hover:shadow-md sm:min-h-[170px] sm:p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-2xl transition-colors duration-300 group-hover:bg-black sm:h-12 sm:w-12">
                    <span className="transition-transform duration-300 group-hover:scale-110 group-hover:grayscale-0 group-hover:brightness-110">
                      {category.icon}
                    </span>
                  </span>

                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 text-sm text-gray-500 transition-all duration-300 group-hover:border-black group-hover:bg-black group-hover:text-white">
                    ↗
                  </span>
                </div>

                <div className="mt-5">
                  <h3 className="text-sm font-bold leading-snug tracking-tight text-black sm:text-base">
                    {category.name}
                  </h3>

                  <p className="mt-1.5 text-[11px] leading-relaxed text-gray-500 sm:text-xs">
                    {category.subtitle}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <Link
          to="/menu"
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 py-3 text-xs font-semibold text-black transition hover:border-black hover:bg-black hover:text-white sm:hidden"
        >
          Explore Full Menu <span>↗</span>
        </Link>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="bg-[#F8F8F7]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20 lg:px-12">
          <Reveal>
            <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-[10px] font-bold tracking-[0.25em] text-gray-500">
                  HANDPICKED FOR YOU
                </p>
                <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
                  The good stuff.
                </h2>
                <p className="mt-3 text-sm text-gray-500">
                  Discover treats worth coming back for.
                </p>
              </div>

              <Link
                to="/menu"
                className="w-fit border-b border-black pb-2 text-sm font-semibold"
              >
                View all products →
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product, index) => (
              <motion.article
                key={product.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -5 }}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white"
              >
                <Link
                  to={`/menu?category=${encodeURIComponent(product.category)}`}
                  className="image-hover relative block bg-gray-100"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-64 w-full object-cover sm:h-72"
                  />

                  {product.tag && (
                    <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-2 text-[9px] font-bold tracking-wider">
                      {product.tag}
                    </span>
                  )}

                  <span className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg transition group-hover:bg-black group-hover:text-white">
                    ↗
                  </span>
                </Link>

                <div className="p-5">
                  <p className="text-[10px] font-bold tracking-[0.2em] text-gray-500">
                    {product.category.toUpperCase()}
                  </p>

                  <h3 className="mt-2 font-bold">{product.name}</h3>

                  <div className="mt-4 flex items-center justify-between gap-2">
                    <span className="font-bold">{product.price}</span>
                    <Link
                      to={`/menu?category=${encodeURIComponent(product.category)}`}
                      className="rounded-full bg-black px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-gray-700"
                    >
                      Explore
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND VALUES */}
      <section className="bg-[#111111] text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 md:grid-cols-2 md:py-24 lg:px-12">
          <Reveal direction="right">
            <p className="text-[10px] font-bold tracking-[0.3em] text-gray-400">
              WHAT MAKES US DIFFERENT
            </p>

            <h2 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl">
              Quality.
              <br />
              <span className="font-serif italic font-normal text-gray-400">
                Friendly. Hygiene.
              </span>
            </h2>

            <p className="mt-6 max-w-lg text-sm leading-7 text-gray-400 sm:text-base">
              At Bingooo CAP, quality comes first. We believe in serving
              delicious products made with care, welcoming every customer with
              friendly service, and maintaining high standards of cleanliness
              and hygiene in everything we do.
            </p>

            <Link
              to="/about"
              className="mt-8 inline-flex rounded-full bg-white px-7 py-4 text-sm font-semibold text-black transition hover:bg-gray-200"
            >
              Discover Our Values ↗
            </Link>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <img
              src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1000&auto=format&fit=crop"
              alt="A clean and welcoming cafe"
              loading="lazy"
              className="h-72 w-full rounded-2xl object-cover sm:h-96"
            />
          </Reveal>
        </div>
      </section>

      {/* COLLECTIONS */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20 lg:px-12">
        <Reveal>
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Pick your kind of happy.
          </h2>
          <p className="mt-3 text-sm text-gray-500">
            A little something for everyone.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {collections.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Link
                to={item.link}
                className="group relative block h-72 overflow-hidden rounded-2xl bg-gray-100"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <p className="text-[10px] font-bold tracking-[0.2em] text-gray-300">
                    {item.subtitle}
                  </p>
                  <h3 className="mt-2 text-2xl font-bold">{item.title}</h3>
                  <p className="mt-3 text-sm">Explore collection ↗</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 pb-16 sm:px-8 md:pb-24">
        <Reveal>
          <div className="mx-auto max-w-7xl rounded-3xl bg-[#F4F4F2] px-6 py-14 text-center sm:px-12 sm:py-20">
            <p className="text-[10px] font-bold tracking-[0.25em] text-gray-500">
              YOUR NEXT FAVORITE IS WAITING
            </p>

            <h2 className="mt-4 text-3xl font-extrabold sm:text-5xl">
              Make today a Bingooo day.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-500">
              Coffee, sundaes, ice cream, milk drinks, and fruity treats. Find
              something delicious for every mood.
            </p>

            <Link
              to="/menu"
              className="mt-8 inline-flex rounded-full bg-black px-8 py-4 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Explore All Products ↗
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
};

export default HomePage;
