import React from "react";
import { Truck, ShieldCheck, Headphones, BadgePercent } from "lucide-react";
import { useTranslations } from "next-intl";

const Services = () => {
  const t = useTranslations('components.main.home.Services');
  
  const services = [
    {
      id: 1,
      icon: Truck,
      title: t('text1'),
      description: t('text2'),
    },
    {
      id: 2,
      icon: ShieldCheck,
      title: t('text3'),
      description: t('text4'),
    },
    {
      id: 3,
      icon: Headphones,
      title: t('text5'),
      description: t('text6'),
    },
    {
      id: 4,
      icon: BadgePercent,
      title: t('text7'),
      description: t('text8'),
    },
  ];

  return (
    <section className="py-12 bg-primary-foreground">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white p-6 rounded-lg flex items-start gap-4 transition-transform hover:-translate-y-2 hover:shadow-md"
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                <service.icon size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                <p className="text-sm">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;