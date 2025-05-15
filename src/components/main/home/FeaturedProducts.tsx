"use client";

import React, { useState } from "react";
import { Heart, Eye, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Dog Chew Toy",
    slug: "dog-chew-toy",
    category: "Dogs",
    price: 19.99,
    salePrice: 15.99,
    image:
      "https://images.unsplash.com/photo-1591946614720-90a587da4a36?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
    rating: 5,
    isNew: true,
    isSale: true,
  },
  {
    id: 2,
    name: "Cat Tree House",
    slug: "cat-tree-house",
    category: "Cats",
    price: 89.99,
    salePrice: null,
    image:
      "https://images.unsplash.com/photo-1579044188148-17166fbf05b7?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
    rating: 4,
    isNew: true,
    isSale: false,
  },
  {
    id: 3,
    name: "Premium Dog Food",
    slug: "premium-dog-food",
    category: "Dogs",
    price: 49.99,
    salePrice: 39.99,
    image:
      "https://images.unsplash.com/photo-1585846888147-a458e3a4ed27?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3",
    rating: 5,
    isNew: false,
    isSale: true,
  },
  {
    id: 4,
    name: "Bird Cage Deluxe",
    slug: "bird-cage-deluxe",
    category: "Birds",
    price: 129.99,
    salePrice: null,
    image:
      "https://images.unsplash.com/photo-1581342996035-5b56b0e6b43e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
    rating: 4,
    isNew: false,
    isSale: false,
  },
  {
    id: 5,
    name: "Cat Collar with Bell",
    slug: "cat-collar-with-bell",
    category: "Cats",
    price: 12.99,
    salePrice: 9.99,
    image:
      "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
    rating: 4,
    isNew: false,
    isSale: true,
  },
  {
    id: 6,
    name: "Aquarium Filter System",
    slug: "aquarium-filter-system",
    category: "Fish",
    price: 34.99,
    salePrice: null,
    image:
      "https://images.unsplash.com/photo-1584623572265-1f8f8677ce69?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
    rating: 5,
    isNew: true,
    isSale: false,
  },
  {
    id: 7,
    name: "Hamster Exercise Wheel",
    slug: "hamster-exercise-wheel",
    category: "Small Pets",
    price: 15.99,
    salePrice: null,
    image:
      "https://images.unsplash.com/photo-1553987882-91d92995e16c?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
    rating: 4,
    isNew: false,
    isSale: false,
  },
  {
    id: 8,
    name: "Dog Leash & Collar Set",
    slug: "dog-leash-collar-set",
    category: "Dogs",
    price: 29.99,
    salePrice: 24.99,
    image:
      "https://images.unsplash.com/photo-1516734212186-a967f81ad959?q=80&w=2598&auto=format&fit=crop&ixlib=rb-4.0.3",
    rating: 5,
    isNew: true,
    isSale: true,
  },
];

const ProductCard = ({ product }: { product: (typeof products)[0] }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group bg-white border border-primary/10 rounded-lg overflow-hidden transition-all hover:shadow-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-60 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform group-hover:scale-110"
        />

        {/* Product badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <Badge className="bg-green-800 rounded-full text-white">New</Badge>
          )}
          {product.isSale && (
            <Badge className="bg-primary rounded-full text-white">Sale</Badge>
          )}
        </div>
      </div>

      <div className="p-4">
        <Link
          href={`/product/${product.slug}`}
          className="block mb-1 text-sm hover:text-primary hover:underline transition-colors"
        >
          {product.category}
        </Link>
        <Link
          href={`/product/${product.slug}`}
          className="block mb-2 text-lg font-semibold hover:text-primary hover:underline transition-colors"
        >
          {product.name}
        </Link>

        <div className="flex items-center mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={
                i < product.rating
                  ? "fill-primary text-primary"
                  : "text-gray-300"
              }
            />
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {product.salePrice ? (
              <>
                <span className="text-primary font-medium text-lg">
                  ${product.salePrice.toFixed(2)}
                </span>
                <span className=" line-through text-sm">
                  ${product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-primary font-medium text-lg">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          <Button size="sm" variant="default" asChild className="rounded-full">
            <Link href={`/product/${product.slug}`}>Shop Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

const FeaturedProducts = () => {
  const [activeTab, setActiveTab] = useState("all");

  const filteredProducts =
    activeTab === "all"
      ? products
      : products.filter(
          (product) => product.category.toLowerCase() === activeTab
        );

  return (
    <section className="section-padding bg-primary-foreground">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">
            Featured <span className="text-primary">Products</span>
          </h2>
          <p className="section-subtitle">
            Find the perfect products for your beloved pets
          </p>

          {/* Category filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            <Button
              onClick={() => setActiveTab("all")}
              variant={activeTab === "all" ? "default" : "outline"}
              className={
                activeTab === "all"
                  ? "bg-primary text-white shadow-none rounded-full"
                  : "bg-white border-primary/10 hover:text-primary hover:border-primary shadow-none rounded-full"
              }
            >
              All Products
            </Button>
            <Button
              onClick={() => setActiveTab("dogs")}
              variant={activeTab === "dogs" ? "default" : "outline"}
              className={
                activeTab === "dogs"
                  ? "bg-primary text-white shadow-none rounded-full"
                  : "bg-white border-primary/10 hover:text-primary hover:border-primary shadow-none rounded-full"
              }
            >
              Dogs
            </Button>
            <Button
              onClick={() => setActiveTab("cats")}
              variant={activeTab === "cats" ? "default" : "outline"}
              className={
                activeTab === "cats"
                  ? "bg-primary text-white shadow-none rounded-full"
                  : "bg-white border-primary/10 hover:text-primary hover:border-primary shadow-none rounded-full"
              }
            >
              Cats
            </Button>
            <Button
              onClick={() => setActiveTab("fish")}
              variant={activeTab === "fish" ? "default" : "outline"}
              className={
                activeTab === "fish"
                  ? "bg-primary text-white shadow-none rounded-full"
                  : "bg-white border-primary/10 hover:text-primary hover:border-primary shadow-none rounded-full"
              }
            >
              Fish
            </Button>
            <Button
              onClick={() => setActiveTab("birds")}
              variant={activeTab === "birds" ? "default" : "outline"}
              className={
                activeTab === "birds"
                  ? "bg-primary text-white shadow-none rounded-full"
                  : "bg-white border-primary/10 hover:text-primary hover:border-primary shadow-none rounded-full"
              }
            >
              Birds
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button className="bg-primary hover:bg-primary/95 text-white rounded-full px-8 py-6 font-medium">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
