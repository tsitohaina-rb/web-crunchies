"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import ShopModal from "../shop/ShopModal";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const Hero = () => {
    const t = useTranslations('components.main.home.Hero');
  const [isShopModalOpen, setIsShopModalOpen] = useState(false);
  return (
    <section className="relative bg-primary-foreground py-12 md:py-16 lg:py-20">
      <div className="absolute top-10 left-10 w-20 h-20 bg-primary/20 rounded-full opacity-50"></div>
      {/* <div className="absolute top-[30%] left-[30%] w-20 h-20 bg-transparent border-8 border-orange-300 rounded-full opacity-50"></div> */}
      <div className="absolute bottom-32 right-10 w-32 h-32 bg-primary/20 rounded-full opacity-50"></div>
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1 animate-slide-in">
            <span className="bg-white text-primary px-4 py-1 rounded-full text-sm font-medium">
              {t('text1')}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6 leading-tight">
              {t('text2')} <br />
              {t('text3')}
            </h1>
            <p className="text-lg mb-8 max-w-lg">
              {t('text4')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                className="text-white rounded-full px-8 py-6 font-medium transition-all duration-200 hover:shadow-lg hover:scale-105"
                asChild
              >
                <Link href="/shop/all">
                  {t('text5')} <ArrowRight size={18} className="ml-1" />
                </Link>
              </Button>
              {/* <Button
                variant="outline"
                className="bg-white rounded-full px-8 py-6 font-medium"
              >
                View More
              </Button> */}
            </div>
          </div>
          <div className="order-1 md:order-2">
            <Image
              src="/images/hero.png"
              width={500}
              height={500}
              alt="Happy dog"
              className="rounded-full w-full max-w-lg mx-auto object-cover h-[400px] md:h-[500px]"
            />
          </div>
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
      {/* Shop Modal */}
      <ShopModal
        isOpen={isShopModalOpen}
        onOpen={() => setIsShopModalOpen(true)}
        onClose={() => setIsShopModalOpen(false)}
      />
    </section>
  );
};

export default Hero;
