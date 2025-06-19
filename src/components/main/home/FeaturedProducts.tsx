"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import products from "@/data/products-data";
import ProductCard from "../product/ProductCard";
import Link from "next/link";

const FeaturedProducts = () => {
  const [productLimit, setProductLimit] = useState(8);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 1024) {
        // mobile
        setProductLimit(4);
      } else if (width < 1280) {
        // tablet
        setProductLimit(6);
      } else {
        // desktop
        setProductLimit(8);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.slice(0, productLimit).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button className="bg-primary hover:bg-primary/95 text-white rounded-full px-8 py-6 font-medium">
            <Link href="/shop/all">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
