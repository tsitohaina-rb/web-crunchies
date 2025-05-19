import React from "react";
import products from "@/data/products-data";
import ProductCard from "../product/ProductCard";

const ProductsList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((products, key) => (
        <ProductCard key={key} product={products} />
      ))}
    </div>
  );
};

export default ProductsList;
