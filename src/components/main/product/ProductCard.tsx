"use client";

import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Fragment, useState } from "react";
import products from "@/data/products-data";
import { averageRating } from "@/lib/review";
import { getLinkWithSubcategoriesAndName } from "@/lib/formats";
import ShopModal from "../shop/ShopModal";
import Image from "next/image";
import { Link } from "@/i18n/routing";

const ProductCard = ({ product }: { product: (typeof products)[0] }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isShopModalOpen, setIsShopModalOpen] = useState(false);

  return (
    <Fragment>
      <div
        className="group bg-white border border-primary/10 rounded-lg overflow-hidden transition-all hover:shadow-sm h-full flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-60 overflow-hidden flex-shrink-0">
          <Link href={`/product/${product.slug}`}>
            <Image
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform group-hover:scale-110"
              width={600}
              height={450}
              priority
            />
          </Link>

          {/* Product badges */}
          {/* Reset if need it */}
          {/* <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <Badge className="bg-green-800 rounded-full text-white">New</Badge>
          )}
          {product.isSale && (
            <Badge className="bg-primary rounded-full text-white">Sale</Badge>
          )}
        </div> */}
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <Link
            href={getLinkWithSubcategoriesAndName(product.subcategory).linkSub}
            className="block mb-1 text-sm hover:text-primary hover:underline transition-colors"
          >
            {getLinkWithSubcategoriesAndName(product.subcategory).nameSub}
          </Link>
          <Link
            href={`/product/${product.slug}`}
            className="block mb-3 text-lg font-semibold hover:text-primary hover:underline transition-colors line-clamp-2 flex-grow"
            title={product.name}
          >
            {product.name}
          </Link>

          {/* Reset if active price */}
          {/* <div className="flex items-center mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={
                i < averageRating(product.reviews)
                  ? "fill-primary text-primary"
                  : "text-gray-300"
              }
            />
          ))}
        </div> */}

          {/* star and button buy - now at bottom */}
          <div className="flex items-center justify-between mt-auto">
            {/* Reset if active price */}
            {/* <div className="flex items-center gap-2">
            {product.variants[0].salePrice ? (
              <>
                <span className="text-primary font-medium text-lg">
                  {getCurrencySymbol(product.variants[0].currency)}
                  {product.variants[0].salePrice.toFixed(2)}
                </span>
                <span className=" line-through text-sm">
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
          </div> */}

            {/* Star ratings */}
            <div className="flex items-center flex-shrink-0">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < averageRating(product.reviews)
                      ? "fill-primary text-primary"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>

            <Button
              size="sm"
              variant="default"
              className="rounded-full flex-shrink-0 ml-2"
              onClick={() => setIsShopModalOpen(true)}
            >
              Shop Now
            </Button>
          </div>
        </div>
      </div>
      <ShopModal
        slug={product.slug}
        isOpen={isShopModalOpen}
        onOpen={() => setIsShopModalOpen(true)}
        onClose={() => setIsShopModalOpen(false)}
      />
    </Fragment>
  );
};

export default ProductCard;
