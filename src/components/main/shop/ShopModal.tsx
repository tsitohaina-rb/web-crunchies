"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import products from "@/data/products-data";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { averageRating } from "@/lib/review";
import { getCurrencySymbol } from "@/lib/formats";
import { Input } from "@/components/ui/input";
import { MapShopProps } from "@/components/ui/map-shop";

interface ShopModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  slug?: string;
  markers?: MapShopProps[];
}

const MapComponent = dynamic(() => import("@/components/ui/map-shop"), {
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-primary-foreground">
      <div className="text-center">
        <p className="text-gray-700">Chargement de la carte...</p>
      </div>
    </div>
  ),
  ssr: true,
});

type ActiveTab = "online" | "nearby";

const ShopModal = ({ isOpen, onClose, slug, markers }: ShopModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>("online");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof products)[0] | null
  >(products.find((p) => p.slug === slug) || null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const onClickTab = (tab: ActiveTab) => {
    if (tab === "online") {
      setActiveTab("online");
    } else {
      setActiveTab("nearby");
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50"
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-3xl max-h-[85vh] flex flex-col bg-white rounded-2xl shadow-2xl mx-4 border border-gray-100 overflow-hidden"
          >
            {/* Modal Header - Fixed */}
            <div className="flex-none flex items-center justify-between p-6 bg-gradient-to-r from-primary/10 to-transparent">
              <h2 className="text-xl font-bold text-primary">
                Find Our Recipes at Trusted Retailers
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-primary/10 rounded-full transition-all duration-200 hover:rotate-90"
                aria-label="Close modal"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="flex-1 overflow-y-auto bg-gray-50/50">
              <div className="p-6">
                {/* Search Bar */}
                <div className="mb-8">
                  <div className="relative group">
                    <Input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-100 focus:border-primary/30 transition-all duration-200 bg-white shadow-sm"
                    />
                    <Search
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-primary transition-colors duration-200"
                      size={20}
                    />
                  </div>

                  {/* Search Results */}
                  {searchQuery && (
                    <div className="mt-3 max-h-48 overflow-y-auto rounded-xl border border-gray-100 bg-white shadow-sm divide-y divide-gray-50">
                      {filteredProducts.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => setSelectedProduct(product)}
                          className={`w-full text-left p-3 hover:bg-gray-50 transition-colors duration-200
                            ${
                              selectedProduct?.id === product.id
                                ? "bg-primary/5"
                                : ""
                            }`}
                        >
                          <div className="flex gap-4 items-center">
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white border border-gray-100">
                              <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-contain p-2"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium mb-1 truncate">
                                {product.name}
                              </h4>
                              <div className="flex items-center gap-4">
                                <div className="text-sm text-gray-600">
                                  {product.variants[0].salePrice ? (
                                    <div className="flex items-center gap-2">
                                      <span className="text-primary font-medium">
                                        {getCurrencySymbol(
                                          product.variants[0].currency
                                        )}
                                        {product.variants[0].salePrice}
                                      </span>
                                      <span className="line-through text-gray-400">
                                        {getCurrencySymbol(
                                          product.variants[0].currency
                                        )}
                                        {product.variants[0].price}
                                      </span>
                                    </div>
                                  ) : (
                                    <span className="font-medium">
                                      {getCurrencySymbol(
                                        product.variants[0].currency
                                      )}
                                      {product.variants[0].price}
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-1 bg-primary/5 px-2 py-1 rounded-full">
                                  <Star className="w-3 h-3 fill-primary text-primary" />
                                  <span className="text-xs font-medium text-primary">
                                    {averageRating(product.reviews).toFixed(1)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                      {filteredProducts.length === 0 && (
                        <p className="p-4 text-gray-500 text-center">
                          No products found
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Selected Product Details */}
                {selectedProduct && (
                  <div className="mb-8">
                    <div className="p-6 rounded-2xl border border-primary/10 bg-white/80 backdrop-blur-sm">
                      <div className="flex gap-6">
                        {/* Product Image */}
                        <div className="relative aspect-square w-40 rounded-xl overflow-hidden flex-shrink-0 bg-white border border-gray-100">
                          <Image
                            src={selectedProduct.images[0]}
                            alt={selectedProduct.name}
                            fill
                            className="object-contain p-3"
                          />
                          {selectedProduct.isNew && (
                            <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                              New
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start gap-4">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 mb-1">
                                {selectedProduct.name}
                              </h3>
                              <p className="text-sm text-primary/70 capitalize mb-3">
                                {selectedProduct.subcategory
                                  .split("-")
                                  .join(" ")}
                              </p>
                            </div>
                            <div className="flex items-center gap-1 bg-primary/5 px-3 py-1.5 rounded-full">
                              <Star className="w-4 h-4 fill-primary text-primary" />
                              <span className="font-medium text-primary">
                                {averageRating(selectedProduct.reviews).toFixed(
                                  1
                                )}
                              </span>
                            </div>
                          </div>

                          {/* Variants */}
                          <div className="mt-4">
                            <p className="text-sm font-medium text-gray-700 mb-2">
                              Available Options:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {selectedProduct.variants.map((variant, idx) => (
                                <div
                                  key={idx}
                                  className="px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-100 text-sm"
                                >
                                  <span className="font-medium">
                                    {variant.weight}
                                  </span>
                                  <span className="mx-2">-</span>
                                  {variant.salePrice ? (
                                    <span>
                                      <span className="text-primary font-medium">
                                        {getCurrencySymbol(variant.currency)}
                                        {variant.salePrice}
                                      </span>
                                      <span className="text-gray-400 line-through ml-1">
                                        {getCurrencySymbol(variant.currency)}
                                        {variant.price}
                                      </span>
                                    </span>
                                  ) : (
                                    <span className="font-medium">
                                      {getCurrencySymbol(variant.currency)}
                                      {variant.price}
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tabs */}
                <div className="flex gap-2 mb-8 p-1.5 bg-gray-100 rounded-xl">
                  {["online", "nearby"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => onClickTab(tab as ActiveTab)}
                      className={`
                        flex-1 px-6 py-3 rounded-lg font-medium capitalize transition-all duration-200
                        ${
                          activeTab === tab
                            ? "bg-white text-primary shadow-sm ring-1 ring-gray-100"
                            : "text-gray-600 hover:text-primary hover:bg-white/50"
                        }
                      `}
                    >
                      Find {tab}
                    </button>
                  ))}
                </div>

                {/* Online Stores List */}
                {activeTab === "online" && (
                  <div className="space-y-4">
                    {selectedProduct?.findOnline.map((shop, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group flex justify-between items-center p-4 rounded-xl border border-gray-100 hover:border-primary/20 hover:shadow-md transition-all duration-200 bg-white"
                      >
                        <div className="flex items-center gap-4">
                          <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-white p-2 border border-gray-100 group-hover:border-primary/20 transition-colors">
                            <Image
                              src={shop.image || "/images/logo/amazone.png"}
                              alt={shop.shopName || "Online Store"}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                              {shop.shopName || "Online Store"}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center gap-1 bg-primary/5 px-2 py-1 rounded-full">
                                <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                                <span className="text-sm font-medium">
                                  {shop.note}
                                </span>
                              </div>
                              <span className="text-sm text-gray-500">
                                ({shop.review} reviews)
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button
                          className="rounded-full transition-all duration-200 hover:shadow-lg hover:scale-105"
                          asChild
                        >
                          <a
                            href={shop.url || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Buy Now
                          </a>
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Map View */}
                {activeTab === "nearby" && (
                  <div className="rounded-xl overflow-hidden border-2 border-gray-100 shadow-sm">
                    <MapComponent markersDynamic={markers} />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ShopModal;
