import React from "react";
import products from "@/data/products-data";
import ProductCard from "./ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const RelatedProducts = ({
  currentProductId,
  subcategory,
}: {
  currentProductId: number;
  subcategory: string;
}) => {
  const relatedProducts = products
    .filter(
      (product) =>
        product.subcategory === subcategory && product.id !== currentProductId
    )
    .slice(0, 4);

  return (
    relatedProducts.length > 0 && (
      <section className="py-12">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <Carousel className="w-full">
          <CarouselContent className="-ml-4">
            {relatedProducts.map((product) => (
              <CarouselItem
                key={product.id}
                className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </div>
        </Carousel>
      </section>
    )
  );
};

export default RelatedProducts;
