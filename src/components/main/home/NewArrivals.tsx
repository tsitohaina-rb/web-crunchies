import React from "react";
import { Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import products from "@/data/products-data";
import NewArrivalCard from "../product/NewArrivalCard";
import { useTranslations } from "next-intl";

const NewArrivals = () => {
  const t = useTranslations('components.main.home.NewArrivals');
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">
            {t('text1')} <span className="text-primary">{t('text2')}</span>
          </h2>
          <p className="section-subtitle">
            {t('text3')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <NewArrivalCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
