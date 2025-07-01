import ProductsFilter from "@/components/main/shop/ProductsFilter";
import { Metadata } from "next";
import React from "react";
import productsData from "@/data/products-data";
import categoriesData from "@/data/categories-data";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ShopProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ShopProps): Promise<Metadata> {
  const { slug } = await params;
  const category = categoriesData.find((categ) => categ.slug === slug);

  return {
    title: category ? `Shop ${category.title}` : "Shop All Products",
    description: `Browse our selection of ${
      category ? category.title : "all products"
    } for your pets.`,
  };
}

const ShopPage = async ({ params }: ShopProps) => {
  const { slug } = await params;
  const category = categoriesData.find((categ) => categ.slug === slug);

  // Filter products based on category
  const filteredProducts =
    slug === "all"
      ? productsData
      : productsData.filter((product) => product.subcategory.startsWith(slug));

  if (!category && slug !== "all") {
    return (
      <main className="flex flex-col items-center justify-center min-h-[40vh] mt-20 lg:mt-28">
        <svg
          className="w-16 h-16 text-gray-300 mb-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
          />
        </svg>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          Category Not Found
        </h2>
        <p className="text-gray-500 mb-4 text-center">
          Sorry, we couldn't find the category you are looking for.
        </p>
        <Button asChild>
          <Link href="/">Back to home</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="flex-grow mt-20 lg:mt-28">
      <div className="bg-primary-foreground py-16 relative">
        <div className="container-custom">
          <h2 className="section-title text-center">
            Shopping for{" "}
            <span className="text-primary capitalize">
              {slug === "all" ? "All Products" : category?.title}
            </span>
          </h2>
          <p className="text-lg text-center max-w-2xl mx-auto text-petio-text">
            {slug === "all"
              ? "Discover our complete collection of pet products"
              : `Browse our selection of ${category?.title} products`}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 md:h-24">
          <svg
            className="w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 1440 48"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,0 C240,48 720,48 1440,0 L1440,48 L0,48 Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
      <div className="container-custom py-8">
        <ProductsFilter categ={category} />
      </div>
    </main>
  );
};

export default ShopPage;