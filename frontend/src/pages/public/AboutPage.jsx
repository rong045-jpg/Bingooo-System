import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Reveal from "../../components/ui/Reveal";

const AboutPage = () => {
  return (
    <main className="bg-white">
      <section className="bg-[#F6F6F4] px-5 py-20 sm:px-8 md:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.25em] text-gray-500">
              GET TO KNOW US
            </p>

            <h1 className="mt-5 max-w-3xl text-5xl font-extrabold leading-tight sm:text-7xl">
              A little joy.
              <br />
              <span className="font-serif italic font-normal text-gray-500">
                In every moment.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-gray-500">
              Bingooo CAP brings together the drinks, desserts, and treats that
              make everyday moments a little more special.
            </p>

            <Link
              to="/menu"
              className="mt-8 inline-flex rounded-full bg-black px-7 py-4 text-sm font-semibold text-white hover:bg-gray-800"
            >
              Explore Our Menu ↗
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 md:py-24 lg:px-12">
        <Reveal direction="right">
          <motion.img
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5 }}
            src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=1000&auto=format&fit=crop"
            alt="Freshly prepared coffee"
            className="h-80 w-full rounded-2xl object-cover sm:h-[450px]"
          />
        </Reveal>

        <Reveal direction="left">
          <p className="text-xs font-bold tracking-[0.25em] text-gray-500">
            OUR PHILOSOPHY
          </p>

          <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
            Good things are meant to be shared.
          </h2>

          <p className="mt-5 text-sm leading-8 text-gray-500 sm:text-base">
            Whether you're grabbing a morning coffee, enjoying an afternoon
            milkshake, or sharing a sundae with friends, Bingooo CAP is about
            making room for the little things that bring people joy.
          </p>

          <p className="mt-4 text-sm leading-8 text-gray-500 sm:text-base">
            Explore a variety of drinks and desserts, discover your favorites,
            and find something new whenever you visit.
          </p>
        </Reveal>
      </section>

      <section className="bg-[#111111] px-5 py-16 text-center text-white sm:px-8 md:py-24">
        <Reveal>
          <p className="text-xs font-bold tracking-[0.25em] text-gray-400">
            YOUR NEXT FAVORITE IS WAITING
          </p>

          <h2 className="mt-4 text-3xl font-extrabold sm:text-5xl">
            Make it a Bingooo moment.
          </h2>

          <Link
            to="/menu"
            className="mt-8 inline-flex rounded-full bg-white px-7 py-4 text-sm font-semibold text-black transition hover:bg-gray-200"
          >
            Discover the Menu ↗
          </Link>
        </Reveal>
      </section>
    </main>
  );
};

export default AboutPage;
