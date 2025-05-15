"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Phone, MapPin, Clock, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useIsMobile } from "@/hooks/use-mobile";
import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    title: "Pet Food",
    href: "/category/pet-food",
    description: "Food, toys, and accessories for your canine companion",
    image: "/images/category-pet-food.png",
  },
  {
    title: "Pet Grooming",
    href: "/category/pet-grooming",
    description: "Everything your feline friend needs to be happy",
    image: "/images/category-pet-grooming.png",
  },
  {
    title: "Pet Apparel",
    href: "/category/pet-apparel",
    description: "Aquariums, food, and care products for fish",
    image: "/images/category-pet-apparel.png",
  },
  {
    title: "Pet Healthcare",
    href: "/category/pet-healthcare",
    description: "Cages, food, and toys for your feathered pets",
    image: "/images/category-pet-healthcare.png",
  },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();

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

  return (
    <header className="w-full">
      {/* Top Header */}
      <div className="bg-primary/5 py-2 hidden lg:block">
        <div className="container-custom flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-primary" />
              <span className="text-sm">+1 (234) 567-8901</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-primary" />
              <span className="text-sm">Find a Store</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-primary" />
              <span className="text-sm">Mon-Sat: 8.00-18.00</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <select className="bg-transparent text-sm focus:outline-none">
              <option>USD</option>
              <option>EUR</option>
              <option>GBP</option>
            </select>
            <select className="bg-transparent text-sm focus:outline-none">
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
          isScrolled ? "shadow-md sticky top-0 z-50 transition-all" : ""
        }`}
      >
        <div className="container-custom flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Crunchies_Logo"
              className=" w-full h-auto"
              height={80}
              width={80}
            />
            {/* <h1 className="text-3xl font-bold">
              <span className="text-primary">Crun</span>
              <span className="text-petio-heading">chies</span>
            </h1> */}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link
                    href="/"
                    className="font-medium hover:text-primary transition-colors flex items-center p-2"
                  >
                    Home
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-medium">
                    Shop
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[300px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[800px] lg:grid-cols-4">
                      <li className="row-span-1 col-span-full mb-2">
                        <NavigationMenuLink asChild>
                          <Link
                            href="/shop"
                            className="flex items-center justify-center p-2 bg-primary/10 rounded-md hover:bg-primary/20 transition-colors"
                          >
                            <div className="text-center">
                              <h3 className="font-bold text-lg text-primary">
                                All Categories
                              </h3>
                              <p className="text-xs text-muted-foreground">
                                Browse all pet products
                              </p>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>

                      {categories.map((category) => (
                        <li key={category.title} className="row-span-3">
                          <NavigationMenuLink asChild>
                            <Link
                              href={category.href}
                              className="flex flex-col space-y-3 p-3 rounded-md hover:bg-primary/5 transition-colors"
                            >
                              <div className="overflow-hidden rounded-md">
                                <AspectRatio
                                  ratio={16 / 9}
                                  className="hover:bg-primary/5"
                                >
                                  <img
                                    src={category.image}
                                    alt={category.title}
                                    className="object-cover w-full h-full transition-all hover:scale-105"
                                  />
                                </AspectRatio>
                              </div>
                              <div className="space-y-1 text-center">
                                <h3 className="font-medium text-base">
                                  {category.title}
                                </h3>
                                <p className="text-xs text-muted-foreground line-clamp-2">
                                  {category.description}
                                </p>
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link
                    href="/blog"
                    className="font-medium hover:text-primary transition-colors p-2"
                  >
                    Blog
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link
                    href="/about"
                    className="font-medium hover:text-primary transition-colors p-2"
                  >
                    About
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link
                    href="/contact"
                    className="font-medium hover:text-primary transition-colors p-2"
                  >
                    Contact
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Header Actions */}
          <div className="flex items-center gap-4">
            <Button variant="outline" className="rounded-full shadow-none">
              <Search className="text-primary" />
              <span className="hidden sm:flex">Search</span>
            </Button>
            <Button variant="default" asChild className="rounded-full">
              <Link href="/shop">Shop Now</Link>
            </Button>
            <button
              className="lg:hidden ml-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg fixed top-[72px] left-0 w-full h-[calc(100vh-72px)] z-50 overflow-auto">
          <div className="p-4">
            <ul className="flex flex-col gap-4">
              <li>
                <Link
                  href="/"
                  className="font-medium block py-2 border-b border-primary/10 hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li className="border-b border-primary/10">
                <div className="font-medium py-2 hover:text-primary transition-colors">
                  Shop
                </div>
                <div className="pl-4 py-2 space-y-4">
                  <Link
                    href="/shop"
                    className="font-medium block py-2 text-primary hover:text-primary/80 transition-colors"
                  >
                    All Categories
                  </Link>
                  {categories.map((category) => (
                    <div key={category.title} className="mb-4">
                      <Link
                        href={category.href}
                        className="flex items-start gap-3"
                      >
                        <div className="w-20 h-20 rounded-md overflow-hidden">
                          <img
                            src={category.image}
                            alt={category.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">{category.title}</h4>
                          <p className="text-xs text-muted-foreground">
                            {category.description}
                          </p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="font-medium block py-2 border-b border-primary/10 hover:text-primary transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="font-medium block py-2 border-b border-primary/10 hover:text-primary transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="font-medium block py-2 border-b border-primary/10 hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>

            <div className="mt-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-primary" />
                  <span className="text-sm">+1 (234) 567-8901</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-primary" />
                  <span className="text-sm">Find a Store</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-primary" />
                  <span className="text-sm">Mon-Sat: 8.00-18.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
