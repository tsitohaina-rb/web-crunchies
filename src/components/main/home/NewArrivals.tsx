import React from "react";
import { Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import products from "@/data/products-data";
import NewArrivalCard from "../product/NewArrivalCard";

const NewArrivals = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">
            New <span className="text-primary">Arrivals</span>
          </h2>
          <p className="section-subtitle">
            Check out our latest pet products and accessories
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <NewArrivalCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
