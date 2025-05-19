"use client";

import React, { useState } from "react";
import ReviewModal from "./ReviewModal";
import products from "@/data/products-data";
import {
  MessageSquarePlus,
  ShoppingCart,
  Star,
  Share2,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Heart,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Globe,
  Clock,
  MapPin,
  ThumbsUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  getCurrencySymbol,
  getLinkWithSubcategoriesAndName,
} from "@/lib/formats";
import { averageRating } from "@/lib/review";

const ProductDetail = ({ product }: { product: (typeof products)[0] }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [wishlist, setWishlist] = useState(false);

  const handleSubmitReview = (data: any) => {
    if (!product) return;
    // In a real app, this would send the review to an API
    console.log("Review submitted:", data);
  };

  const nextImage = () => {
    setActiveImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setActiveImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-12">
        {/* Product Images Section */}
        <div className="relative md:col-span-2">
          <div className="mb-4 overflow-hidden rounded-lg border border-gray-200 bg-white relative group">
            {product.isNew && (
              <div className="absolute top-4 left-4 z-1 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded">
                New
              </div>
            )}
            {selectedVariant.salePrice && (
              <div className="absolute top-4 right-4 z-1 bg-primary text-white text-xs font-semibold px-3 py-1 rounded">
                {Math.round(
                  ((selectedVariant.price - selectedVariant.salePrice) /
                    selectedVariant.price) *
                    100
                )}
                % OFF
              </div>
            )}

            <Image
              src={product.images[activeImageIndex]}
              alt={product.name}
              className="w-full h-[450px] object-contain p-4 transition-transform duration-300 group-hover:scale-105"
              width={600}
              height={450}
              priority
            />

            {/* Image Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-label="Previous image"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-label="Next image"
            >
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Thumbnail Images */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`border rounded-md overflow-hidden min-w-[80px] h-20 transition-all duration-200 ${
                  activeImageIndex === index
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setActiveImageIndex(index)}
              >
                <Image
                  src={image}
                  alt={`${product.name} - view ${index + 1}`}
                  className="w-full h-full object-cover"
                  width={80}
                  height={80}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          {/* Ratings */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={
                    i < averageRating(product.reviews)
                      ? "fill-primary text-primary"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {product.reviews.length}{" "}
              {product.reviews.length === 1 ? "review" : "reviews"}
            </span>
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="text-sm text-primary hover:underline ml-2"
            >
              Write a review
            </button>
          </div>

          {/* Price */}
          <div className="mb-6">
            {selectedVariant.salePrice ? (
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary">
                  {getCurrencySymbol(selectedVariant.currency)}
                  {selectedVariant.salePrice.toFixed(2)}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  {getCurrencySymbol(selectedVariant.currency)}
                  {selectedVariant.price.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-2xl font-bold text-primary">
                {selectedVariant.currency}
                {selectedVariant.price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Short Description */}
          <div className="text-gray-700 mb-6 border-t border-b border-gray-200 py-4">
            <p>{product.description}</p>
          </div>

          {/* Variants Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Weight
            </label>
            <div className="relative">
              <select
                className="w-full border border-gray-300 rounded-md py-2 pl-4 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white"
                value={selectedVariant.weight}
                onChange={(e) => {
                  const selected = product.variants.find(
                    (v) => v.weight === e.target.value
                  );
                  if (selected) setSelectedVariant(selected);
                }}
              >
                {product.variants.map((variant, index) => (
                  <option key={index} value={variant.weight}>
                    {variant.weight}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                size={18}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            <Button
              className="flex-grow flex items-center justify-center"
              size="lg"
            >
              <ShoppingCart size={20} className="mr-2" />
              Shop Now
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-center px-4"
              onClick={() => setWishlist(!wishlist)}
            >
              <Heart
                size={20}
                className={wishlist ? "fill-primary text-primary" : ""}
              />
            </Button>
          </div>

          {/* Social Share */}
          <div className="flex items-center gap-2 mb-8">
            <span className="text-sm font-medium text-gray-700">Share:</span>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-8 w-8"
              >
                <Facebook size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-8 w-8"
              >
                <Twitter size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-8 w-8"
              >
                <Instagram size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-8 w-8"
              >
                <Linkedin size={16} />
              </Button>
            </div>
          </div>

          {/* Product Details */}
          <div className="border-t border-gray-200 pt-4">
            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="flex">
                <span className="font-medium w-24 text-gray-600">
                  Category:
                </span>
                <Link
                  href={
                    getLinkWithSubcategoriesAndName(product.subcategory).linkSub
                  }
                  className="hover:text-primary transition-colors hover:underline"
                >
                  {getLinkWithSubcategoriesAndName(product.subcategory).nameSub}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="border-t-2 pt-12 mt-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-xl font-bold">Customer Reviews</h3>
            <div className="flex items-center mt-2">
              <div className="flex mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={
                      i < averageRating(product.reviews)
                        ? "fill-primary text-primary"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                Based on {product.reviews.length}{" "}
                {product.reviews.length === 1 ? "review" : "reviews"}
              </span>
            </div>
          </div>
          <Button
            onClick={() => setIsReviewModalOpen(true)}
            className="flex items-center gap-2"
          >
            <MessageSquarePlus size={18} />
            Write a Review
          </Button>
        </div>

        {/* Review List */}
        <div className="space-y-6 bg-white p-6 rounded-lg">
          {product.reviews.length > 0 ? (
            product.reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-lg p-0 border border-gray-100 hover:shadow-sm transition-shadow duration-300 overflow-hidden"
              >
                {/* Review Header */}
                <div className="bg-gray-50 p-4 border-b ">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {review.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-gray-800">
                            {review.name}
                          </h4>
                          <div className="flex items-center text-xs bg-gray-100 px-2 py-1 rounded-full">
                            <Globe size={12} className="mr-1 text-primary" />
                            <span className="text-gray-600">
                              {review.countryCode}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={
                                  i < review.rating
                                    ? "fill-primary text-primary"
                                    : "text-gray-300"
                                }
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500 flex items-center">
                            <Clock size={12} className="mr-1" />
                            {review.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        Verified Purchase
                      </span>
                    </div>
                  </div>
                </div>

                {/* Review Content */}
                <div className="p-4">
                  <p className="text-gray-700 mb-3">{review.text}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <MessageSquarePlus
                size={48}
                className="mx-auto text-gray-300 mb-4"
              />
              <p className="text-gray-500 mb-4">
                No reviews yet. Be the first to review this product!
              </p>
              <Button
                variant="outline"
                onClick={() => setIsReviewModalOpen(true)}
              >
                Write a Review
              </Button>
            </div>
          )}
        </div>
      </div>

      <ReviewModal
        isOpen={isReviewModalOpen}
        onOpenChange={setIsReviewModalOpen}
        onSubmit={handleSubmitReview}
      />
    </>
  );
};

export default ProductDetail;
