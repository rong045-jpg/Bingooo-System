import React, { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "../../components/ui/Reveal";

// ========================================
// PRICES — EDIT THESE WHENEVER YOU NEED
// ========================================
const XL_EXTRA = 0.75;

const TOPPINGS = [
  { name: "Bubble", price: 0.5 },
  { name: "Coconut Jelly", price: 0.5 },
  { name: "Crystal Ball", price: 0.5 },
];

const products = [
  {
    id: 1,
    name: "Signature Iced Latte",
    category: "Coffee",
    price: 4.5,
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=700&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Classic Cappuccino",
    category: "Coffee",
    price: 3.5,
    image:
      "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=700&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Chocolate Ice Cream",
    category: "Ice Cream",
    price: 3.5,
    image:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=700&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Strawberry Sundae",
    category: "Sundaes",
    price: 5.5,
    image:
      "https://images.unsplash.com/photo-1560008581-09826d1de69e?q=80&w=700&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Vanilla Milkshake",
    category: "Milk Drinks",
    price: 4.0,
    image:
      "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=700&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Mango Smoothie",
    category: "Fruit Drinks",
    price: 4.75,
    image:
      "https://images.unsplash.com/photo-1546173159-315724a31696?q=80&w=700&auto=format&fit=crop",
  },
  {
    id: 7,
    name: "Sweet Matcha Latte",
    category: "Milk Drinks",
    price: 4.25,
    image:
      "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?q=80&w=700&auto=format&fit=crop",
  },
  {
    id: 8,
    name: "Fresh Fruit Drink",
    category: "Fruit Drinks",
    price: 3.75,
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765edfd7?q=80&w=700&auto=format&fit=crop",
  },
  {
    id: 9,
    name: "Sweet Dessert",
    category: "Desserts",
    price: 4.0,
    image:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=700&auto=format&fit=crop",
  },
];

const categories = [
  "All",
  "Coffee",
  "Ice Cream",
  "Sundaes",
  "Milk Drinks",
  "Fruit Drinks",
  "Desserts",
];

const money = (amount) => `$${amount.toFixed(2)}`;

const isCustomizableDrink = (product) =>
  ["Coffee", "Milk Drinks", "Fruit Drinks"].includes(product.category);

const defaultSize = (product) =>
  product.category === "Fruit Drinks" ? "L" : "M";

const MenuPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const [cart, setCart] = useState([]);
  const [customizing, setCustomizing] = useState(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const [sugar, setSugar] = useState(50);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [cupSize, setCupSize] = useState("M");

  const selectedCategory = categories.includes(searchParams.get("category"))
    ? searchParams.get("category")
    : "All";

  const chooseCategory = (category) => {
    const next = new URLSearchParams(searchParams);

    if (category === "All") {
      next.delete("category");
    } else {
      next.set("category", category);
    }

    setSearchParams(next);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, search]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cart.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0,
  );

  const openCustomizer = (product) => {
    setCustomizing(product);
    setSugar(50);
    setSelectedToppings([]);
    setCupSize(isCustomizableDrink(product) ? defaultSize(product) : "Regular");
    setNotice("");
  };

  const toggleTopping = (toppingName) => {
    setSelectedToppings((current) =>
      current.includes(toppingName)
        ? current.filter((name) => name !== toppingName)
        : [...current, toppingName],
    );
  };

  const getConfiguredPrice = (product, size, toppings) => {
    const toppingTotal = toppings.reduce((total, name) => {
      const topping = TOPPINGS.find((item) => item.name === name);
      return total + (topping?.price || 0);
    }, 0);

    const sizeExtra = size === "XL" ? XL_EXTRA : 0;

    return product.price + toppingTotal + sizeExtra;
  };

  const addToCart = () => {
    if (!customizing) return;

    const customizable = isCustomizableDrink(customizing);
    const size = customizable ? cupSize : "Regular";
    const itemSugar = customizable ? sugar : null;
    const toppings = customizable ? [...selectedToppings] : [];

    const unitPrice = getConfiguredPrice(customizing, size, toppings);

    // Identical configurations share one cart line.
    const key = [
      customizing.id,
      size,
      itemSugar,
      [...toppings].sort().join(","),
    ].join("-");

    setCart((current) => {
      const existing = current.find((item) => item.key === key);

      if (existing) {
        return current.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [
        ...current,
        {
          key,
          productId: customizing.id,
          name: customizing.name,
          image: customizing.image,
          category: customizing.category,
          size,
          sugar: itemSugar,
          toppings,
          unitPrice,
          quantity: 1,
        },
      ];
    });

    setNotice(`${customizing.name} added to cart`);
    setCustomizing(null);
  };

  const changeQuantity = (key, change) => {
    setCart((current) =>
      current
        .map((item) =>
          item.key === key
            ? { ...item, quantity: item.quantity + change }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeFromCart = (key) => {
    setCart((current) => current.filter((item) => item.key !== key));
  };

  const beginCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutOpen(true);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* HERO */}
      <section className="bg-[#F6F6F4] px-5 py-14 sm:px-8 md:py-20 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.25em] text-gray-500">
              SOMETHING DELICIOUS AWAITS
            </p>

            <h1 className="mt-4 text-4xl font-extrabold sm:text-6xl">
              Our Menu.
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-7 text-gray-500 sm:text-base">
              Discover your favorites, from freshly made coffee to creamy
              sundaes and refreshing fruit drinks.
            </p>

            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("menu-products")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="mt-6 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Order now ↓
            </button>
          </Reveal>
        </div>
      </section>

      {/* MENU */}
      <section
        id="menu-products"
        className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-12 lg:px-12"
      >
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                onClick={() => chooseCategory(category)}
                className={`shrink-0 rounded-full px-5 py-3 text-xs font-semibold transition ${
                  selectedCategory === category
                    ? "bg-black text-white"
                    : "border border-gray-200 bg-white text-gray-600 hover:border-black hover:text-black"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <label className="flex min-w-0 items-center gap-3 rounded-full border border-gray-200 px-4 py-3 lg:w-72">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
            />
          </label>
        </div>

        <div className="mb-7 mt-8 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {filteredProducts.length} products
          </p>

          <Link to="/" className="text-sm font-semibold hover:underline">
            ← Back home
          </Link>
        </div>

        {notice && (
          <div
            role="status"
            className="mb-6 flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm"
          >
            <span>{notice}</span>
            <button
              type="button"
              onClick={() => setNotice("")}
              className="ml-3 text-gray-500 hover:text-black"
              aria-label="Dismiss notification"
            >
              ✕
            </button>
          </div>
        )}

        {filteredProducts.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filteredProducts.map((product, index) => (
              <motion.article
                layout
                key={product.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.04,
                }}
                whileHover={{ y: -4 }}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white"
              >
                <div className="image-hover overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-56 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-64"
                  />
                </div>

                <div className="p-5">
                  <p className="text-[10px] font-bold tracking-[0.2em] text-gray-500">
                    {product.category.toUpperCase()}
                  </p>

                  <h2 className="mt-2 font-bold">{product.name}</h2>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="font-bold">{money(product.price)}</span>

                    <button
                      type="button"
                      onClick={() => openCustomizer(product)}
                      className="rounded-full bg-black px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-gray-800"
                    >
                      Customize +
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        ) : (
          <div className="rounded-2xl bg-gray-50 px-5 py-20 text-center">
            <p className="text-lg font-bold">No products found</p>
            <p className="mt-2 text-sm text-gray-500">
              Try another search or select a different category.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSearchParams({});
              }}
              className="mt-5 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      {/* FLOATING CART BUTTON */}
      <button
        type="button"
        onClick={beginCheckout}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full bg-black px-5 py-4 text-sm font-bold text-white shadow-xl transition hover:scale-105"
      >
        <span aria-hidden="true">🛒</span>
        <span>Cart · {cartCount}</span>
        <span>{money(cartTotal)}</span>
      </button>

      {/* CUSTOMIZATION MODAL */}
      <AnimatePresence>
        {customizing && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setCustomizing(null);
              }
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="customize-title"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 25 }}
              className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-5 shadow-2xl sm:rounded-3xl sm:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] text-gray-500">
                    CUSTOMIZE YOUR ORDER
                  </p>
                  <h2
                    id="customize-title"
                    className="mt-2 text-xl font-extrabold"
                  >
                    {customizing.name}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    {money(customizing.price)} base price
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setCustomizing(null)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                  aria-label="Close customization"
                >
                  ✕
                </button>
              </div>

              {isCustomizableDrink(customizing) && (
                <>
                  {/* SUGAR */}
                  <div className="mt-7">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold">Sugar level</h3>
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold">
                        {sugar}%
                      </span>
                    </div>

                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="10"
                      value={sugar}
                      onChange={(event) => setSugar(Number(event.target.value))}
                      className="mt-5 w-full cursor-pointer accent-black"
                      aria-label="Sugar level"
                    />

                    <div className="mt-1 flex justify-between text-xs text-gray-400">
                      <span>0% · No sugar</span>
                      <span>100% · Extra sweet</span>
                    </div>

                    <div className="mt-4 grid grid-cols-6 gap-2 sm:grid-cols-11">
                      {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(
                        (value) => (
                          <button
                            type="button"
                            key={value}
                            onClick={() => setSugar(value)}
                            className={`rounded-lg py-2 text-[10px] font-semibold transition ${
                              sugar === value
                                ? "bg-black text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                          >
                            {value}
                          </button>
                        ),
                      )}
                    </div>
                  </div>

                  {/* TOPPINGS */}
                  <div className="mt-7">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold">Add toppings</h3>
                      <span className="text-xs text-gray-500">Optional</span>
                    </div>

                    <div className="mt-3 space-y-2">
                      {TOPPINGS.map((topping) => {
                        const checked = selectedToppings.includes(topping.name);

                        return (
                          <label
                            key={topping.name}
                            className={`flex cursor-pointer items-center justify-between rounded-xl border p-3.5 transition ${
                              checked
                                ? "border-black bg-gray-50"
                                : "border-gray-200 hover:border-gray-400"
                            }`}
                          >
                            <span className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggleTopping(topping.name)}
                                className="h-4 w-4 accent-black"
                              />
                              <span className="text-sm font-medium">
                                {topping.name}
                              </span>
                            </span>

                            <span className="text-sm font-semibold">
                              +{money(topping.price)}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* CUP SIZE */}
                  <div className="mt-7">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold">Cup size</h3>
                      <span className="text-xs text-gray-500">Choose one</span>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-3">
                      {["M", "L", "XL"].map((size) => {
                        // M and L are both available for drink orders.
                        const selected = cupSize === size;
                        const extra = size === "XL" ? XL_EXTRA : 0;

                        return (
                          <button
                            type="button"
                            key={size}
                            onClick={() => setCupSize(size)}
                            className={`flex items-center justify-between rounded-xl border p-4 text-left transition ${
                              selected
                                ? "border-black bg-black text-white"
                                : "border-gray-200 hover:border-gray-400"
                            }`}
                          >
                            <span>
                              <span className="block text-sm font-bold">
                                {size}
                              </span>
                              <span
                                className={`mt-1 block text-[11px] ${
                                  selected ? "text-gray-300" : "text-gray-500"
                                }`}
                              >
                                {size === "XL"
                                  ? "Extra large"
                                  : size === "L"
                                    ? "Large"
                                    : "Medium"}
                              </span>
                            </span>

                            <span className="text-xs font-bold">
                              {extra > 0 ? `+${money(extra)}` : "Included"}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <p className="mt-2 text-xs text-gray-500">
                      Default size: {defaultSize(customizing)}. XL adds{" "}
                      {money(XL_EXTRA)}.
                    </p>
                  </div>
                </>
              )}

              {!isCustomizableDrink(customizing) && (
                <div className="mt-6 rounded-xl bg-gray-50 p-4 text-sm leading-6 text-gray-600">
                  This item is sold at its regular price for now. Drink
                  customization is available for coffee, milk drinks, and fruit
                  drinks.
                </div>
              )}

              {/* PRICE SUMMARY */}
              <div className="mt-7 rounded-2xl bg-gray-50 p-4">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Base price</span>
                  <span>{money(customizing.price)}</span>
                </div>

                {isCustomizableDrink(customizing) && (
                  <>
                    <div className="mt-2 flex justify-between text-sm text-gray-500">
                      <span>XL size</span>
                      <span>
                        {cupSize === "XL" ? `+${money(XL_EXTRA)}` : "$0.00"}
                      </span>
                    </div>

                    <div className="mt-2 flex justify-between text-sm text-gray-500">
                      <span>Toppings</span>
                      <span>
                        +
                        {money(
                          selectedToppings.reduce((total, name) => {
                            const topping = TOPPINGS.find(
                              (item) => item.name === name,
                            );
                            return total + (topping?.price || 0);
                          }, 0),
                        )}
                      </span>
                    </div>
                  </>
                )}

                <div className="mt-3 flex justify-between border-t border-gray-200 pt-3">
                  <span className="text-sm font-bold">Total per item</span>
                  <span className="text-lg font-extrabold">
                    {money(
                      getConfiguredPrice(
                        customizing,
                        isCustomizableDrink(customizing) ? cupSize : "Regular",
                        isCustomizableDrink(customizing)
                          ? selectedToppings
                          : [],
                      ),
                    )}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={addToCart}
                className="mt-5 w-full rounded-full bg-black px-5 py-4 text-sm font-bold text-white transition hover:bg-gray-800"
              >
                Add to Cart ·{" "}
                {money(
                  getConfiguredPrice(
                    customizing,
                    isCustomizableDrink(customizing) ? cupSize : "Regular",
                    isCustomizableDrink(customizing) ? selectedToppings : [],
                  ),
                )}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CART / CHECKOUT */}
      <AnimatePresence>
        {checkoutOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setCheckoutOpen(false);
              }
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="cart-title"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 25 }}
              className="flex max-h-[90vh] w-full max-w-xl flex-col rounded-t-3xl bg-white sm:rounded-3xl"
            >
              <div className="flex items-center justify-between border-b border-gray-100 p-5 sm:p-6">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] text-gray-500">
                    BINGOOO CAP
                  </p>
                  <h2 id="cart-title" className="mt-1 text-2xl font-extrabold">
                    Your Cart ({cartCount})
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setCheckoutOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                  aria-label="Close cart"
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 sm:p-6">
                {cart.length === 0 ? (
                  <div className="py-12 text-center">
                    <div className="text-4xl">🛒</div>
                    <p className="mt-4 font-bold">Your cart is empty</p>
                    <p className="mt-2 text-sm text-gray-500">
                      Add your favorite drinks to get started.
                    </p>
                    <button
                      type="button"
                      onClick={() => setCheckoutOpen(false)}
                      className="mt-5 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white"
                    >
                      Browse Menu
                    </button>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {cart.map((item) => (
                      <div
                        key={item.key}
                        className="flex gap-3 border-b border-gray-100 pb-5"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-20 w-20 shrink-0 rounded-xl object-cover"
                        />

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-sm font-bold">{item.name}</h3>
                            <span className="shrink-0 text-sm font-bold">
                              {money(item.unitPrice * item.quantity)}
                            </span>
                          </div>

                          <p className="mt-1 text-xs text-gray-500">
                            {item.size !== "Regular" && `Size ${item.size}`}
                            {item.sugar !== null && ` · Sugar ${item.sugar}%`}
                          </p>

                          {item.toppings.length > 0 && (
                            <p className="mt-1 text-xs text-gray-500">
                              Toppings: {item.toppings.join(", ")}
                            </p>
                          )}

                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center gap-3 rounded-full border border-gray-200 px-2 py-1">
                              <button
                                type="button"
                                onClick={() => changeQuantity(item.key, -1)}
                                className="flex h-6 w-6 items-center justify-center"
                                aria-label={`Decrease ${item.name} quantity`}
                              >
                                −
                              </button>

                              <span className="min-w-4 text-center text-xs font-bold">
                                {item.quantity}
                              </span>

                              <button
                                type="button"
                                onClick={() => changeQuantity(item.key, 1)}
                                className="flex h-6 w-6 items-center justify-center"
                                aria-label={`Increase ${item.name} quantity`}
                              >
                                +
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeFromCart(item.key)}
                              className="text-xs text-gray-500 underline hover:text-black"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t border-gray-100 p-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Subtotal ({cartCount} items)
                    </span>
                    <span className="text-xl font-extrabold">
                      {money(cartTotal)}
                    </span>
                  </div>

                  <p className="mt-2 text-xs leading-5 text-gray-500">
                    Delivery fees and other charges, if any, are not included.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setCheckoutOpen(false);
                      setNotice(
                        "Checkout preview only. Connect a payment provider to accept real payments.",
                      );
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="mt-5 w-full rounded-full bg-black px-5 py-4 text-sm font-bold text-white transition hover:bg-gray-800"
                  >
                    Proceed to Payment · {money(cartTotal)}
                  </button>

                  <p className="mt-3 text-center text-[11px] text-gray-400">
                    Payment is not connected yet.
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default MenuPage;
