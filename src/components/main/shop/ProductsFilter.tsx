"use client";

import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import categories from "@/data/categories-data";
import products from "@/data/products-data";
import ProductsList from "./ProductsList";
import { Slider } from "@/components/ui/slider";

const ProductsFilter = () => {
  const [category, setCategory] = useState("");
  const [subcategories, setSubcategories] = useState<any[]>();
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [rating, setRating] = useState(0);

  const handlePriceChange = (value: number[]) => {
    setPriceRange({ min: value[0], max: value[1] });
  };

  useEffect(() => {
    setSubcategories(
      categories.find((item) => item.slug === category)?.subcategories
    );
  }, [category]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
      <div className="border border-primary/10 p-4 rounded-lg space-y-6">
        {/* Categories Filter */}
        <div className="flex flex-col gap-2">
          <label htmlFor="category" className="font-medium">
            Categories
          </label>
          <select
            name="category"
            id="category"
            className="w-full border border-gray-300 rounded-md py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All</option>
            {categories.map((category, key) => (
              <option value={category.slug} key={key}>
                {category.title}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategories Filter */}
        <div className="flex flex-col gap-2">
          <label htmlFor="subcategory" className="font-medium">
            Subcategories
          </label>
          <select
            name="subcategory"
            id="subcategory"
            className="w-full border border-gray-300 rounded-md py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white"
            disabled={!subcategories}
          >
            <option value="all">All</option>
            {subcategories?.map((category, key) => (
              <option value={category.slug} key={key}>
                {category.title}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div className="flex flex-col gap-4">
          <label className="font-medium">Price Range</label>
          <Slider
            defaultValue={[priceRange.min, priceRange.max]}
            max={1000}
            step={10}
            onValueChange={handlePriceChange}
            className="mt-2"
          />
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">${priceRange.min}</span>
            <span className="text-sm text-gray-500">${priceRange.max}</span>
          </div>
        </div>

        {/* Rating Filter */}
        <div className="flex flex-col gap-2">
          <label className="font-medium">Rating</label>
          <div className="flex gap-2">
            {[5, 4, 3, 2, 1].map((stars) => (
              <button
                key={stars}
                onClick={() => setRating(stars === rating ? 0 : stars)}
                className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors ${
                  rating === stars
                    ? "bg-primary text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                <Star
                  size={16}
                  className={
                    rating === stars
                      ? "fill-white"
                      : "fill-primary text-primary"
                  }
                />
                <span>{stars}+</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="col-span-2">
        <ProductsList />
      </div>
    </div>
  );
};

export default ProductsFilter;
