"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import products from "@/data/products-data";
import ProductCard from "../product/ProductCard";
import { Link } from "@/i18n/routing";

const FeaturedProducts = () => {
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
          {products.slice(0, 4).map((product) => (
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
