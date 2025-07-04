import React from "react";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import categories from "@/data/categories-data";
import products from "@/data/products-data";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const CategoryBanner = () => {
  const t = useTranslations("components.main.home.CategoryBanner");
  const getTotalProductsForCategory = (slug: string): number => {
    return products.filter((product) => product.category === slug).length;
  };
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">
            {t("text1")} <span className="text-primary">{t("text2")}</span>
          </h2>
          <p className="section-subtitle">{t("text3")}</p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <Carousel
            opts={{
              align: "center",
              loop: true,
              slidesToScroll: 1,
            }}
            className="w-full"
          >
            <CarouselContent className="flex justify-center -ml-2 md:-ml-4">
              {categories.map((category) => (
                <CarouselItem
                  key={category.id}
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 flex-shrink-0"
                >
                  <Link
                    href={`/shop/${category.slug}`}
                    className={`${category.color} rounded-2xl p-4 block h-full transition-transform hover:-translate-y-2 group mx-auto max-w-sm`}
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
                          <span className="mr-1">{category.icon}</span>
                          <span className="text-sm">
                            {getTotalProductsForCategory(category.slug)}
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
            <CarouselPrevious className="absolute flex lg:hidden left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 border-primary text-primary hover:bg-primary hover:text-white" />
            <CarouselNext className="absolute flex lg:hidden right-0 top-1/2 -translate-y-1/2 translate-x-1/2 border-primary text-primary hover:bg-primary hover:text-white" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default CategoryBanner;
