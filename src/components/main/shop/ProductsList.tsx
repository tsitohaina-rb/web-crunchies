import React from "react";
import products from "@/data/products-data";
import ProductCard from "../product/ProductCard";

interface ProductsListProps {
  products: typeof products;
}

const ProductsList = ({ products }: ProductsListProps) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No products match your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product, key) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsList;
