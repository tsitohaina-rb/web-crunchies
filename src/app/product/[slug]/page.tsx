import React from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import products from "@/data/products-data";
import { Button } from "@/components/ui/button";
import ProductDetail from "@/components/main/product/ProductDetail";
import RelatedProducts from "@/components/main/product/RelatedProducts";
import Newsletter from "@/components/main/Newsletter";
import { getLinkWithSubcategoriesAndName } from "@/lib/formats";
import { Metadata } from "next";

interface ProductDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((product) => product.slug === slug);

  try {
    if (product) {
      return {
        title: `${product.name}` || "Crunchies : Product Detail",
        description: product.description || "Product detail description",
        openGraph: {
          title: product.name,
          description: product.description,
          images: product?.images ?? null,
        },
      };
    }
  } catch (error) {
    console.error("Error fetching post for metadata:", error);
  }

  return {
    title: "Crunchies : Product not found",
    description: "Product not found description",
  };
}

const ProductDetailPage = async ({ params }: ProductDetailProps) => {
  const { slug } = await params;
  const product = products.find((product) => product.slug === slug);
  if (!product) {
    return (
      <main className="flex-grow bg-primary-foreground mt-20 lg:mt-28 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6">
            Sorry, we couldn't find the product you're looking for.
          </p>
          <Button asChild>
            <Link href="/shops">Back to Products</Link>
          </Button>
        </div>
      </main>
    );
  }
  return (
    <main className="flex-grow mt-20 lg:mt-28 bg-gray-50">
      <div className="container-custom py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-8 bg-primary-foreground p-4 rounded-lg">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  href={
                    getLinkWithSubcategoriesAndName(product.subcategory).linkSub
                  }
                >
                  {
                    getLinkWithSubcategoriesAndName(product.subcategory)
                      .nameCateg
                  }
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <ProductDetail product={product} />
        <RelatedProducts
          currentProductId={product.id}
          subcategory={product.subcategory}
        />
      </div>
      <Newsletter />
    </main>
  );
};

export default ProductDetailPage;
