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
import Image from "next/image";
import categories from "@/data/categories-data";
import { motion, AnimatePresence } from "framer-motion";
import ShopModal from "@/components/main/shop/ShopModal";
import SearchModal from "./header/SearchModal";
import LanguageSwitcher from "../ui/language-switcher";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const Header = () => {
  const t = useTranslations("components.Header");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMobileCategory, setActiveMobileCategory] = useState<
    "shop" | null
  >(null);
  const [isShopModalOpen, setIsShopModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

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

  const languages = [
    { code: "en", name: "English", flag: "https://flagcdn.com/w320/us.png" },
    { code: "th", name: "ไทย", flag: "https://flagcdn.com/w320/th.png" }, // Thai
    {
      code: "ms",
      name: "Bahasa Melayu",
      flag: "https://flagcdn.com/w320/my.png",
    }, // Malay
    { code: "ko", name: "한국어", flag: "https://flagcdn.com/w320/kr.png" }, // Korean
    { code: "zh", name: "中文", flag: "https://flagcdn.com/w320/cn.png" }, // Chinese
    { code: "ph", name: "Filipino", flag: "https://flagcdn.com/w320/ph.png" }, // Filipino
    {
      code: "id",
      name: "Bahasa Indonesia",
      flag: "https://flagcdn.com/w320/id.png",
    }, // Indonesian
  ];

  return (
    <header className="w-full fixed top-0 z-10">
      {/* Top Header */}
      <div className="bg-gray-200 py-2 hidden lg:block">
        <div className="container-custom flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 hover:text-primary transition-all cursor-pointer">
              <Phone size={16} className="text-primary" />
              <span className="text-sm font-medium">+86 18221419361</span>
            </div>
            <div
              className="flex items-center gap-2 hover:text-primary transition-all cursor-pointer"
              onClick={() => setIsShopModalOpen(true)}
            >
              <MapPin size={16} className="text-primary" />
              <span className="text-sm font-medium">{t("text1")}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-4 w-px bg-gray-300"></div>
            <LanguageSwitcher languages={languages} />
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
                    className="font-medium text-base px-6 py-3 rounded-full hover:bg-primary/5 hover:text-primary transition-colors flex items-center"
                  >
                    {t("text1")}
                  </Link>
                </NavigationMenuItem>

                {/* Categories Dropdown */}
                 <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-medium text-base px-6 py-3 rounded-full hover:bg-primary/5 data-[state=open]:bg-primary/5 data-[state=open]:text-primary [&>svg]:w-4 [&>svg]:h-4">
                    {t("text2")}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <motion.ul
                      className="grid w-[300px] gap-3 grid-cols-2 p-6 max-[40000px]:w-[900px] max-[1552px]:grid-cols-3 "
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
                                      href={`/shop/${category.slug}?subcategory=${sub.slug}`}
                                      className="text-base py-1.5 px-2 rounded hover:bg-primary/5 hover:text-primary transition-colors flex items-center gap-2"
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
                    className="font-medium text-base px-6 py-3 rounded-full hover:bg-primary/5 hover:text-primary transition-colors flex items-center"
                  >
                    {t("text3")}
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    href="/about"
                    className="font-medium text-base px-6 py-3 rounded-full hover:bg-primary/5 hover:text-primary transition-colors flex items-center"
                  >
                    {t("text4")}
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    href="/contact"
                    className="font-medium text-base px-6 py-3 rounded-full hover:bg-primary/5 hover:text-primary transition-colors flex items-center"
                  >
                    {t("text5")}
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Header Actions */}
          <div className="flex items-center gap-3">
            {/* Language Switcher - Mobile visible */}
            <div className="lg:hidden">
              <LanguageSwitcher
                languages={languages}
                className="h-10 px-2 text-sm min-w-[60px]"
              />
            </div>

            <Button
              variant="outline"
              className="rounded-full shadow-none border-primary/20 hover:bg-primary/5 hover:border-primary/30 transition-all duration-200 hover:scale-105"
              onClick={() => setIsSearchModalOpen(true)}
            >
              <Search className="text-primary" size={18} />
              <span className="hidden text-base sm:inline-flex ml-2">{t("text6")}</span>
            </Button>

            <Button
              variant="default"
              className="rounded-full transition-all duration-200 hover:scale-105"
              onClick={() => setIsShopModalOpen(true)}
            >
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} />
                <span className="hidden sm:inline-flex uppercase">
                  {t("text7")}
                </span>
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
                      {t("text1")}
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
                      <span>{t("text2")}</span>
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
                                      href={`/shop/${category.slug}?subcategory=${sub.slug}`}
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
                      {t("text3")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="font-medium py-3 hover:text-primary transition-colors flex items-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t("text4")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="font-medium py-3 hover:text-primary transition-colors flex items-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t("text5")}
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact Information Section - Removed Language Switcher */}
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
                  <div
                    className="flex items-center cursor-pointer gap-3 hover:text-primary transition-colors"
                    onClick={() => setIsShopModalOpen(true)}
                  >
                    <p className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <MapPin size={16} className="text-primary" />
                    </p>
                    <span className="text-sm">{t("text8")}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <Clock size={16} className="text-primary" />
                    </div>
                    <span className="text-sm">Mon-Sat: 8.00-18.00</span>
                  </div>
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

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onOpenChange={setIsSearchModalOpen}
      />
    </header>
  );
};

export default Header;
