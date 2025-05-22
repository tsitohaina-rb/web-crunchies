"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Star } from "lucide-react";
import categories from "@/data/categories-data";
import products from "@/data/products-data";
import ProductsList from "./ProductsList";
import { Slider } from "@/components/ui/slider";
import { averageRating } from "@/lib/review";

interface ProductsFilterProps {
  categ: (typeof categories)[0] | undefined;
}

const ProductsFilter = ({ categ }: ProductsFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize category from props or URL
  const [category, setCategory] = useState(categ?.slug || "all");
  const [subcategory, setSubcategory] = useState(
    searchParams.get("subcategory") || ""
  );
  const [priceRange, setPriceRange] = useState({
    min: Number(searchParams.get("minPrice")) || 0,
    max: Number(searchParams.get("maxPrice")) || 1000,
  });
  const [rating, setRating] = useState(Number(searchParams.get("rating")) || 0);
  const [subcategories, setSubcategories] = useState<any[]>();

  // Filter products based on criteria
  const filteredProducts = products.filter((product) => {
    const matchCategory =
      !category || category === "all" || product.category.startsWith(category);
    const matchSubcategory =
      !subcategory ||
      subcategory === "all" ||
      product.subcategory === subcategory;
    const matchPrice = product.variants.some(
      (variant) =>
        (variant.salePrice || variant.price) >= priceRange.min &&
        (variant.salePrice || variant.price) <= priceRange.max
    );
    const matchRating = !rating || averageRating(product.reviews) >= rating;

    return matchCategory && matchSubcategory && matchPrice && matchRating;
  });

  // Update URL with filters
  const updateFilters = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Handle filter changes
  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setSubcategory("");
    // Navigate to the new category page
    router.push(`/shop/${value}`);
  };

  const handleSubcategoryChange = (value: string) => {
    setSubcategory(value);
    updateFilters({
      subcategory: value === "all" ? null : value,
    });
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange({ min: value[0], max: value[1] });
    updateFilters({
      minPrice: value[0].toString(),
      maxPrice: value[1].toString(),
    });
  };

  const handleRatingChange = (value: number) => {
    const newRating = value === rating ? 0 : value;
    setRating(newRating);
    updateFilters({
      rating: newRating ? newRating.toString() : null,
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setCategory("");
    setSubcategory("");
    setPriceRange({ min: 0, max: 1000 });
    setRating(0);
    router.push("", { scroll: false });
  };

  useEffect(() => {
    setSubcategories(
      categories.find((item) => item.slug === category)?.subcategories
    );
  }, [category]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-5">
      {/* Filters Sidebar */}
      <div className="space-y-6">
        <div className="sticky top-24">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Filter Header */}
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <h3 className="font-semibold text-gray-900">Filters</h3>
            </div>

            <div className="p-4 space-y-6">
              {/* Categories Filter */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">
                  Categories
                </label>
                <select
                  className="w-full rounded-lg border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white 
                    placeholder:text-gray-500 focus:border-primary/30 focus:outline-none focus:ring-2 
                    focus:ring-primary/10 hover:border-gray-300 transition-colors"
                  value={category}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>
                      {cat.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subcategories Filter */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">
                  Subcategories
                </label>
                <select
                  className="w-full rounded-lg border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white 
                    placeholder:text-gray-500 focus:border-primary/30 focus:outline-none focus:ring-2 
                    focus:ring-primary/10 disabled:opacity-50 hover:border-gray-300 transition-colors"
                  value={subcategory}
                  onChange={(e) => handleSubcategoryChange(e.target.value)}
                  disabled={!subcategories?.length}
                >
                  <option value="all">All Subcategories</option>
                  {subcategories?.map((subcat) => (
                    <option key={subcat.slug} value={subcat.slug}>
                      {subcat.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">
                  Price Range
                </label>
                <div className="px-2">
                  <Slider
                    defaultValue={[priceRange.min, priceRange.max]}
                    max={1000}
                    step={10}
                    onValueChange={handlePriceChange}
                    className="my-6"
                  />
                  <div className="flex items-center justify-between text-sm">
                    <div className="px-3 py-1.5 rounded-md bg-gray-50 border border-gray-100">
                      ¥{priceRange.min}
                    </div>
                    <div className="px-3 py-1.5 rounded-md bg-gray-50 border border-gray-100">
                      ¥{priceRange.max}
                    </div>
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">
                  Rating
                </label>
                <div className="flex flex-wrap gap-2">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <button
                      key={stars}
                      onClick={() => handleRatingChange(stars)}
                      className={`
                        flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium 
                        transition-all duration-200 
                        ${
                          rating === stars
                            ? "bg-primary text-white shadow-sm"
                            : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                        }
                      `}
                    >
                      <Star
                        size={14}
                        className={
                          rating === stars
                            ? "fill-white"
                            : "fill-primary text-primary"
                        }
                      />
                      {stars}+
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="p-4 bg-gray-50/50 border-t border-gray-100">
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-900 
                  hover:bg-gray-100 rounded-lg transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="md:col-span-3">
        <ProductsList products={filteredProducts} />
      </div>
    </div>
  );
};

export default ProductsFilter;
