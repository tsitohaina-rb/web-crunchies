import React from "react";
import { Truck, ShieldCheck, Headphones, BadgePercent } from "lucide-react";

const services = [
  {
    id: 1,
    icon: Truck,
    title: "Free Shipping",
    description: "Free shipping for orders above $50",
  },
  {
    id: 2,
    icon: ShieldCheck,
    title: "Quality Products",
    description: "We ensure the quality of our products",
  },
  {
    id: 3,
    icon: Headphones,
    title: "24/7 Customer Support",
    description: "Dedicated support team for queries",
  },
  {
    id: 4,
    icon: BadgePercent,
    title: "Special Discounts",
    description: "Regular promotions and member discounts",
  },
];

const Services = () => {
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
                <p className=" text-sm">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
