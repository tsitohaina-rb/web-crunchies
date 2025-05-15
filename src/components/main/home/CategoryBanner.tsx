"use client";

import React from "react";
import { Cat, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";
import Link from "next/link";

const categories = [
  {
    id: 1,
    title: "Pet Food",
    count: "152",
    image: "/images/category-pet-food.png",
    color: "bg-primary/10",
    href: "/category/pet-food",
  },
  {
    id: 2,
    title: "Pet Grooming",
    count: "137",
    image: "/images/category-pet-grooming.png",
    color: "bg-yellow-50",
    href: "/category/pet-grooming",
  },
  {
    id: 3,
    title: "Pet Apparel",
    count: "57",
    image: "/images/category-pet-apparel.png",
    color: "bg-blue-100",
    href: "/category/pet-apparel",
  },
  {
    id: 4,
    title: "Pet Healthcare",
    count: "83",
    image: "/images/category-pet-healthcare.png",
    color: "bg-green-100",
    href: "/category/pet-healthcare",
  },
];

const CategoryBanner = () => {
  const isMobile = useIsMobile();

  // Determine number of items to show based on screen size
  const getItemsPerSlide = () => {
    if (isMobile) {
      return 1; // Mobile: 1 item per slide
    } else {
      return 1.5; // Desktop: 1.5 items per slide
    }
  };

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">
            Shop by <span className="text-primary">Categories</span>
          </h2>
          <p className="section-subtitle">
            Browse through our product categories to find the perfect match for
            your pet
          </p>
        </div>

        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              slidesToScroll: 1,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {categories.map((category) => (
                <CarouselItem
                  key={category.id}
                  className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/4"
                >
                  <Link
                    href={category.href}
                    className={`${category.color} rounded-2xl p-4 block h-full transition-transform hover:-translate-y-2 group`}
                  >
                    <div className="h-40 sm:h-52 relative overflow-hidden rounded-xl mb-4">
                      <img
                        src={category.image}
                        alt={category.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {category.title}
                        </h3>
                        <div className="flex items-center ">
                          <Cat size={14} className="mr-1" />
                          <span className="text-sm">
                            {category.count} Products
                          </span>
                        </div>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                        <ArrowRight size={18} />
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 border-primary text-primary hover:bg-primary hover:text-white" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 border-primary text-primary hover:bg-primary hover:text-white" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default CategoryBanner;
