import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Mail, Send } from "lucide-react";
import { useTranslations } from "next-intl";

const Newsletter = () => {
  const t = useTranslations('components.Newsletter');
  return (
    <section className="py-16 bg-primary-foreground">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2">
            <div className="flex items-center gap-3 mb-4">
              <Mail size={24} className="text-primary" />
              <h3 className="text-2xl md:text-3xl font-semibold">
                {t('text1')}
              </h3>
            </div>
            <p className=" max-w-lg">
              {t('text2')}
            </p>
          </div>

          <div className="w-full md:w-1/2 max-w-md">
            <form className="flex gap-2">
              <div className="w-full md:w-1/2 flex gap-2">
                <input
                  type="email"
                  placeholder={t('text5')}
                  className="flex-1 px-4 py-2 rounded-lg border border-primary/20 focus:outline-none focus:border-primary"
                />
                <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
                  {t('text3')} <ArrowRight size={16} />
                </button>
              </div>
            </form>
            <p className="text-sm  mt-2">
              {t('text4')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
