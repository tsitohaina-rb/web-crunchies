import Contact from "@/components/main/contact/Contact";
import Map from "@/components/main/contact/MapComponent";
import Newsletter from "@/components/main/Newsletter";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import dynamic from "next/dynamic";
import React from "react";

export const metadata: Metadata = {
  title: "Contact Us - Crunchies",
  description: "Have a question, suggestion, or project in mind? Get in touch with the Crunchies team today. We're here to help.",
};

const MapComponent = dynamic(
  () => import("@/components/main/contact/MapComponent"),
  {
    loading: () => (
      <div className="h-full w-full flex items-center justify-center bg-primary-foreground">
        <div className="text-center">
          <p className="text-gray-700">Chargement de la carte...</p>
        </div>
      </div>
    ),
    ssr: true,
  }
);

const ContactPage = async () => {
    const t = await getTranslations('pages.Contact');
  return (
    <div className="flex-grow mt-20 lg:mt-28  rounded-lg">
      <div className=" bg-primary-foreground py-16 relative">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            {t('text2')}
          </h1>
          <p className="text-lg text-center max-w-2xl mx-auto text-petio-text">
            {t('text3')}
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
      <Contact />
      <div className="container-custom mb-8">
        <MapComponent />
      </div>
      <Newsletter />
    </div>
  );
};

export default ContactPage;
