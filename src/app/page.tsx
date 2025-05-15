import BlogSection from "@/components/main/home/BlogSection";
import CategoryBanner from "@/components/main/home/CategoryBanner";
import FeaturedProducts from "@/components/main/home/FeaturedProducts";
import Hero from "@/components/main/home/Hero";
import NewArrivals from "@/components/main/home/NewArrivals";
import Newsletter from "@/components/main/home/Newsletter";
import PromoBanner from "@/components/main/home/PromoBanner";
import Services from "@/components/main/home/Services";
import Testimonials from "@/components/main/home/Testimonials";
import React from "react";

const HomePage = () => {
  return (
    <main className="flex-grow">
      <Hero />
      <CategoryBanner />
      <FeaturedProducts />
      <PromoBanner />
      <NewArrivals />
      <Services />
      <Testimonials />
      <BlogSection />
      <Newsletter />
    </main>
  );
};

export default HomePage;
