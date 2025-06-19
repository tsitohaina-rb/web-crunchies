"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const About = () => {
  return (
    <div className="flex-grow mt-20 lg:mt-28">
      <section className="relative min-h-[80vh] flex items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          className="absolute inset-0 bg-gradient-to-r from-primary-foreground to-primary/10"
        />
        <div className="container-custom px-6 py-20 relative z-1">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="md:w-1/2 text-center md:text-left"
            >
              <h1 className="heading text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight">
                The Right Choice for <span className="text-primary">Pet</span>{" "}
                Companionship
              </h1>
              <p className="text-xl md:text-2xl mb-12 text-gray-700">
                Where science meets love for your cherished companion
              </p>
              <Button className="rounded-full  hover:scale-105 transition-transform">
                Discover Our Story
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="md:w-1/2 flex justify-center"
            >
              <div className="relative w-72 h-72 lg:w-96 lg:h-96 rounded-full overflow-hidden border-8 border-white shadow-xl hover:scale-105 transition-transform duration-300">
                <Image
                  src="/images/about/about-img.png"
                  alt="Pet and Owner"
                  className="w-full h-full object-cover"
                  height={500}
                  width={500}
                />
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24">
          <svg
            className="w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 1440 48"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,0 C480,48 960,48 1440,0 L1440,48 L0,48 Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-24 bg-white"
      >
        <div className="container-custom px-6">
          <div className="text-center mb-20">
            <h2 className="heading text-2xl md:text-3xl font-bold text-gray-800">
              Our Brand DNA
            </h2>
            <div className="w-24 h-2 bg-primary mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {["Scientific", "Healthy", "Premium", "Holistic"].map(
              (item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="bg-primary/10 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6">
                    <i
                      className={`fas fa-${
                        ["flask", "heartbeat", "crown", "spa"][index]
                      } text-primary text-3xl`}
                    ></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    {item}
                  </h3>
                  <p className="text-gray-600">
                    {
                      [
                        "Research-backed nutrition and care solutions",
                        "Nutritionally balanced for optimal pet health",
                        "Highest quality ingredients and products",
                        "Complete care for pet's physical and emotional needs",
                      ][index]
                    }
                  </p>
                </motion.div>
              )
            )}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-16 bg-primary/5"
      >
        <div className="container-custom px-6">
          <div className="flex flex-col-reverse md:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:w-1/2 pr-0 md:pr-10"
            >
              <h2 className="heading text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                Our Mission
              </h2>
              <p className="text-gray-600 mb-6">
                For the well-being of pets today, CRUNCHIES strives to deliver
                the right solutions:
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="text-primary mt-1">
                    <i className="fas fa-paw text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">
                      Nutritionally balanced food
                    </h3>
                    <p className="text-gray-600">for optimal health</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-primary mt-1">
                    <i className="fas fa-paw text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">
                      Tailored grooming products, daily care essentials, and
                      supplements
                    </h3>
                    <p className="text-gray-600">
                      prioritizing comfort and vitality
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-primary mt-1">
                    <i className="fas fa-paw text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">
                      Relentless research and innovation
                    </h3>
                    <p className="text-gray-600">to elevate pets' lifestyles</p>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mt-8 italic">
                Our mission is to cultivate a culture of holistic well-being,
                where science and care converge for every cherished companion.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:w-1/2 flex justify-center items-center"
            >
              <div className="relative w-full max-w-md">
                <Image
                  src="/images/about/about-img-2.png"
                  alt="Happy Pets"
                  width={500}
                  height={500}
                  className="w-full h-auto rounded-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-16"
      >
        <div className="container-custom px-6">
          <div className="text-center mb-12">
            <h2 className="heading text-2xl md:text-3xll font-bold text-gray-800">
              Brand Story
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
            <p className="text-xl text-primary mt-6 font-medium max-w-3xl mx-auto">
              A warm promise from Korea, striving to be the bridge between pets
              and owners, illuminating homes with love and companionship.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="bg-white rounded-lg border p-8 mb-8 relative">
                <div className="absolute -top-5 -left-5 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div className="flex items-start">
                  <div className="mr-4 text-primary">
                    <i className="fas fa-paw text-3xl"></i>
                  </div>
                  <div>
                    <p className="text-gray-600 leading-relaxed">
                      In 2012, L adopted a stray dog named Dudu in South Korea.
                      Through patience and love, Dudu transformed from a timid
                      companion to an irreplaceable part of L's life. Dudu's
                      fear of thunderstorms and rain made L realize:
                    </p>
                    <p className="text-primary font-medium mt-4 italic">
                      "Pets need not just food, but also security and
                      companionship."
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border p-8 relative">
                <div className="absolute -top-5 -left-5 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div className="flex items-start">
                  <div className="mr-4 text-primary">
                    <i className="fas fa-paw text-3xl"></i>
                  </div>
                  <div>
                    <p className="text-gray-600 leading-relaxed">
                      In 2017, after Dudu's passing, L founded Crunchies—a
                      Korean pet brand committed to delivering love and care to
                      pets worldwide. Every product design carries Dudu's
                      legacy, embodying L's belief:
                    </p>
                    <p className="text-primary font-medium mt-4 italic">
                      "Every pet deserves love, and every life deserves
                      respect."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg overflow-hidden shadow-md">
                <Image
                  src="/images/about/image-1.jpeg"
                  alt="Pet Photo"
                  className="w-full h-full object-cover"
                  height={300}
                  width={300}
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-md">
                <Image
                  src="/images/about/image-2.jpeg"
                  alt="Pet Photo"
                  className="w-full h-full object-cover"
                  height={300}
                  width={300}
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-md">
                <Image
                  src="/images/about/image-3.jpeg"
                  alt="Pet Photo"
                  className="w-full h-full object-cover"
                  height={300}
                  width={300}
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-md">
                <Image
                  src="/images/about/image-4.png"
                  alt="Pet Photo"
                  className="w-full h-full object-cover"
                  height={300}
                  width={300}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-16 bg-primary-foreground"
      >
        <div className="container-custom px-6">
          <div className="text-center">
            <h2 className="heading text-3xl md:text-4xl font-bold mb-8">
              Our Commitment
            </h2>
            <p className="text-lg max-w-3xl mx-auto mb-12">
              CRUNCHIES is dedicated to scientific research in pet nutrition,
              committed to enhancing nutrient absorption, and leveraging
              cutting-edge technology to craft precision-engineered products. We
              provide holistic solutions for a science-guided pet care
              lifestyle.
            </p>
            <button className="bg-white text-primary font-semibold py-3 px-8 rounded-full hover:bg-primary/5 transition">
              Discover Our Products
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
