import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const PromoBanner = () => {
  const t = useTranslations('components.main.home.PromoBanner');
  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Banner */}
          <div className="bg-primary/10 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center relative z-0 overflow-hidden">
            <div className="z-10 md:w-1/2">
              <h3 className="text-xl md:text-2xl font-semibold mb-2">
                {t('text1')}
              </h3>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('text2')} <span className="text-primary">{t('text3')}</span>
              </h2>
              <p className="mb-6 ">
                {t('text4')}
              </p>
              <Button className="bg-primary hover:bg-primary/85 text-white rounded-full">
                {t('text5')} <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
            <div className="md:w-1/2 mt-6 md:mt-0 md:absolute md:bottom-0 md:right-10">
              <Image
                src="https://images.unsplash.com/photo-1589924691995-400dc9ecc119?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3"
                alt="Dog Food"
                className="rounded-2xl max-h-60 object-cover"
                width={200}
                height={80}
              />
            </div>
          </div>

          {/* Second Banner */}
          <div className="bg-yellow-600/10 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center relative overflow-hidden z-0">
            <div className="z-10 md:w-1/2">
              <h3 className="text-xl md:text-2xl font-semibold mb-2">
                {t('text6')}
              </h3>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('text7')} <span className="text-yellow-400">{t('text8')}</span>
              </h2>
              <p className="mb-6 ">
                {t('text9')}
              </p>
              <Button className="bg-yellow-400 hover:bg-yellow-500/95 text-white rounded-full">
                {t('text10')} <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
            <div className="md:w-1/2 mt-6 md:mt-0 md:absolute md:bottom-0 md:right-10">
              <Image
                src="https://images.unsplash.com/photo-1471194402529-8e0f5a675de6?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3"
                alt="Cat Accessories"
                className="rounded-2xl max-h-60 object-cover"
                width={200}
                height={80}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
