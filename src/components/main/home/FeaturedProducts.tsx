"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import products from "@/data/products-data";
import ProductCard from "../product/ProductCard";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const FeaturedProducts = () => {
  const t = useTranslations("components.main.home.FeaturedProducts");
  return (
    <section className="section-padding bg-primary-foreground">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">
            {t("text1")} <span className="text-primary">{t("text2")}</span>
          </h2>
          <p className="section-subtitle">{t("text3")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products
            .filter((item) => item.isFeatured === true)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>

        <div className="mt-12 text-center">
          <Button className="bg-primary hover:bg-primary/95 text-white rounded-full px-8 py-6 font-medium">
            <Link href="/shop/all">{t("text4")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
