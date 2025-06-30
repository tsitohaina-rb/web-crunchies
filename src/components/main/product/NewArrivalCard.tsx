import { Button } from "@/components/ui/button";
import products from "@/data/products-data";
import { Link } from "@/i18n/routing";
import {
  getCurrencySymbol,
  getLinkWithSubcategoriesAndName,
} from "@/lib/formats";
import { Heart, Star } from "lucide-react";
import Image from "next/image";
import React from "react";

const NewArrivalCard = ({ product }: { product: (typeof products)[0] }) => {
  return (
    <div className="group bg-white border border-primary/10 rounded-lg overflow-hidden hover:shadow-sm transition-all">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform group-hover:scale-110"
          height={80}
          width={200}
        />

        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <Button size="sm" variant="default">
            Shop Now
          </Button>
          <button className="h-10 w-10 rounded-full bg-white flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
            <Heart size={18} />
          </button>
        </div>
      </div>

      <div className="p-4">
        <Link
          href={getLinkWithSubcategoriesAndName(product.subcategory).linkSub}
          className="block mb-1 text-sm hover:text-primary hover:underline transition-colors"
        >
          {getLinkWithSubcategoriesAndName(product.subcategory).nameSub}
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
                i < product.reviews.length
                  ? "fill-primary text-primary"
                  : "text-gray-300"
              }
            />
          ))}
        </div>
        {product.variants[0].salePrice ? (
          <>
            <span className="text-primary font-medium text-lg">
              {getCurrencySymbol(product.variants[0].currency)}
              {product.variants[0].salePrice.toFixed(2)}
            </span>
            <span className="ml-2 line-through text-sm">
              {getCurrencySymbol(product.variants[0].currency)}
              {product.variants[0].price.toFixed(2)}
            </span>
          </>
        ) : (
          <span className="text-primary font-medium text-lg">
            {getCurrencySymbol(product.variants[0].currency)}
            {product.variants[0].price.toFixed(2)}
          </span>
        )}
      </div>
    </div>
  );
};

export default NewArrivalCard;
