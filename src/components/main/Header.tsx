"use client";
import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Phone,
  MapPin,
  Clock,
  Search,
  ChevronDown,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import Image from "next/image";
import categories from "@/data/categories-data";
import { motion, AnimatePresence } from "framer-motion";
import ShopModal from "@/components/main/product/ShopModal";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMobileCategory, setActiveMobileCategory] = useState<
    "shop" | null
  >(null);
  const [isShopModalOpen, setIsShopModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Animation variants
  const menuVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.05,
        duration: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0 },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <header className="w-full fixed top-0 z-10">
      {/* Top Header */}
      <div className="bg-gray-200 py-2 hidden lg:block">
        <div className="container-custom flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 hover:text-primary transition-all cursor-pointer">
              <Phone size={16} className="text-primary" />
              <span className="text-sm font-medium">+1 (234) 567-8901</span>
            </div>
            <div className="flex items-center gap-2 hover:text-primary transition-all cursor-pointer">
              <MapPin size={16} className="text-primary" />
              <span className="text-sm font-medium">Find a Store</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-primary" />
              <span className="text-sm font-medium">Mon-Sat: 8.00-18.00</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <select className="bg-transparent text-sm font-medium cursor-pointer focus:outline-none transition-all">
              <option>USD</option>
              <option>EUR</option>
              <option>GBP</option>
            </select>
            <div className="h-4 w-px bg-gray-300"></div>
            <select className="bg-transparent text-sm font-medium cursor-pointer focus:outline-none transition-all">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div
        className={`bg-white py-4 ${
          isScrolled
            ? "shadow-md sticky top-0 z-50 transition-all duration-300"
            : ""
        }`}
      >
        <div className="container-custom flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="relative z-50">
            <Image
              src="/images/logo.png"
              alt="Crunchies_Logo"
              className="w-auto h-auto max-h-16"
              height={80}
              width={80}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                <NavigationMenuItem>
                  <Link
                    href="/"
                    className="font-medium px-4 py-2 rounded-full hover:bg-primary/5 hover:text-primary transition-colors flex items-center"
                  >
                    Home
                  </Link>
                </NavigationMenuItem>

                {/* Categories Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-medium rounded-full hover:bg-primary/5 data-[state=open]:bg-primary/5 data-[state=open]:text-primary">
                    Shop
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <motion.ul
                      className="grid w-[300px] gap-3 grid-cols-2 p-6 max-[1552px]:w-[900px] max-[1552px]:grid-cols-3 "
                      variants={menuVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {categories.map((category) => (
                        <motion.li
                          key={category.id}
                          className="row-span-3"
                          variants={itemVariants}
                        >
                          <NavigationMenuLink asChild>
                            <Link
                              href={`/shop/${category.slug}`}
                              className="block p-4 rounded-xl hover:bg-primary/5 transition-colors border border-transparent hover:border-primary/10"
                            >
                              <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                  <Image
                                    src={category.image}
                                    alt={category.title}
                                    className="w-9 h-9 object-cover rounded-lg"
                                    width={36}
                                    height={36}
                                  />
                                </div>
                                <h3 className="font-bold">{category.title}</h3>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {category.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>

                          {/* Render subcategories outside the Link */}
                          {category.subcategories &&
                            category.subcategories.length > 0 && (
                              <ul className="mt-3 space-y-1 px-4">
                                {category.subcategories.map((sub) => (
                                  <li key={sub.id}>
                                    <Link
                                      href={`/shop/${category.slug}?sub=${sub.slug}`}
                                      className="text-sm py-1.5 px-2 rounded hover:bg-primary/5 hover:text-primary transition-colors flex items-center gap-2"
                                    >
                                      <span className="w-1.5 h-1.5 rounded-full bg-primary/70"></span>
                                      {sub.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link
                    href="/blog"
                    className="font-medium px-4 py-2 rounded-full hover:bg-primary/5 hover:text-primary transition-colors flex items-center"
                  >
                    Blog
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    href="/about"
                    className="font-medium px-4 py-2 rounded-full hover:bg-primary/5 hover:text-primary transition-colors flex items-center"
                  >
                    About
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    href="/contact"
                    className="font-medium px-4 py-2 rounded-full hover:bg-primary/5 hover:text-primary transition-colors flex items-center"
                  >
                    Contact
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Header Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="rounded-full shadow-none border-primary/20 hover:bg-primary/5 hover:border-primary/30"
            >
              <Search className="text-primary" size={18} />
              <span className="hidden sm:inline-flex ml-2">Search</span>
            </Button>
            <Button
              variant="default"
              className="rounded-full"
              onClick={() => setIsShopModalOpen(true)}
            >
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} />
                <span className="hidden sm:inline-flex">Shop Now</span>
              </div>
            </Button>
            <button
              className="lg:hidden ml-2 w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary/5 transition-colors relative z-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Improved */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="lg:hidden bg-white fixed top-0 left-0 w-full h-full z-40 overflow-auto pt-24 pb-16"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
          >
            <div className="px-4 py-2">
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary/10 rounded"></div>

                <ul className="flex flex-col gap-1 pl-4">
                  <li>
                    <Link
                      href="/"
                      className="font-medium py-3 hover:text-primary transition-colors flex items-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Home
                    </Link>
                  </li>

                  <li>
                    <button
                      onClick={() =>
                        setActiveMobileCategory(
                          activeMobileCategory === "shop" ? null : "shop"
                        )
                      }
                      className={`font-medium py-3 w-full text-left flex items-center justify-between ${
                        activeMobileCategory === "shop" ? "text-primary" : ""
                      }`}
                    >
                      <span>Shop</span>
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-300 ${
                          activeMobileCategory === "shop" ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {activeMobileCategory === "shop" && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 space-y-1 mt-1 mb-2">
                            {categories.map((category) => (
                              <div key={category.id} className="mb-3">
                                <Link
                                  href={`/shop/${category.slug}`}
                                  className="font-medium py-2 hover:text-primary flex items-center gap-2"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <Image
                                      src={category.image}
                                      alt={category.title}
                                      className="w-7 h-7 rounded-lg object-cover"
                                      width={28}
                                      height={28}
                                    />
                                  </div>
                                  {category.title}
                                </Link>

                                {category.subcategories?.map((sub) => (
                                  <div key={sub.id} className="ml-8 mb-2">
                                    <Link
                                      href={`/shop/${category.slug}?sub=${sub.slug}`}
                                      className="text-sm py-1.5 hover:text-primary flex items-center gap-2"
                                      onClick={() => setIsMenuOpen(false)}
                                    >
                                      <span className="w-1.5 h-1.5 rounded-full bg-primary/70"></span>
                                      {sub.title}
                                    </Link>
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>

                  <li>
                    <Link
                      href="/blog"
                      className="font-medium py-3 hover:text-primary transition-colors flex items-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="font-medium py-3 hover:text-primary transition-colors flex items-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="font-medium py-3 hover:text-primary transition-colors flex items-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="mt-8 bg-primary/5 p-4 rounded-lg">
                <h3 className="font-medium text-sm mb-3">
                  Contact Information
                </h3>
                <div className="flex flex-col gap-3">
                  <Link
                    href="tel:+12345678901"
                    className="flex items-center gap-3 hover:text-primary transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <Phone size={16} className="text-primary" />
                    </div>
                    <span className="text-sm">+1 (234) 567-8901</span>
                  </Link>
                  <Link
                    href="/stores"
                    className="flex items-center gap-3 hover:text-primary transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <MapPin size={16} className="text-primary" />
                    </div>
                    <span className="text-sm">Find a Store</span>
                  </Link>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <Clock size={16} className="text-primary" />
                    </div>
                    <span className="text-sm">Mon-Sat: 8.00-18.00</span>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs"
                  >
                    USD
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs"
                  >
                    English
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shop Modal */}
      <ShopModal
        isOpen={isShopModalOpen}
        onOpen={() => setIsShopModalOpen(true)}
        onClose={() => setIsShopModalOpen(false)}
      />
    </header>
  );
};

export default Header;
