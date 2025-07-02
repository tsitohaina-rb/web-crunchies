import React from "react";
import { Star, Quote, Globe, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

const testimonials = [
  {
    id: 1,
    name: "John Smith",
    product: "Dog Chew Toy",
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2662&auto=format&fit=crop&ixlib=rb-4.0.3",
    rating: 5,
    text: "I've been shopping at Crunchies for over a year now, and I'm amazed by the quality of their products. My dog absolutely loves the toys and treats I get from here!",
    countryCode: "US",
    date: "2025-01-01",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    product: "Cat Chew Toy",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
    rating: 5,
    text: "Bekalan kucing dari Crunchies memang terbaik. Penghantaran sentiasa tepat pada masanya, dan pasukan khidmat pelanggan mereka amat membantu setiap kali saya ada pertanyaan.",
    countryCode: "MS",
    date: "2025-01-02",
  },
  {
    id: 3,
    name: "Michael Brown",
    product: "Bird Enthusiast",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
    rating: 5,
    text: "Les produits pour chats de Crunchies sont tout simplement géniaux. La livraison est toujours ponctuelle et leur service client est incroyablement serviable quand j'ai des questions.",
    countryCode: "FR",
    date: "2025-01-01",
  },
  {
    id: 4,
    name: "John Smith",
    product: "Dog Owner",
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2662&auto=format&fit=crop&ixlib=rb-4.0.3",
    rating: 5,
    text: "ฉันช้อปปิ้งที่ Crunchies มานานกว่าหนึ่งปีแล้ว และรู้สึกประทับใจกับคุณภาพของสินค้าที่นี่มาก สุนัขของฉันชอบของเล่นและขนมที่ฉันซื้อจากที่นี่มาก!",
    countryCode: "TH",
    date: "2025-01-01",
  },
  {
    id: 5,
    name: "Sarah Johnson",
    product: "Cat Owner",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
    rating: 4,
    text: "The cat supplies from Crunchies are simply the best. The delivery is always on time, and their customer service team is incredibly helpful whenever I have questions.",
    countryCode: "US",
    date: "2025-01-01",
  },
  {
    id: 6,
    name: "Michael Brown",
    product: "Bird Enthusiast",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
    rating: 5,
    text: "J'apprécie le large choix d'accessoires pour oiseaux proposé par Crunchies. Ils ont tout ce dont j'ai besoin pour mes amis à plumes à des prix compétitifs.",
    countryCode: "FR",
    date: "2025-01-01",
  },
];

const Testimonials = () => {
  const t = useTranslations('components.main.home.Testimonials');
  
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section avec espacement amélioré */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 md:mb-6">
            {t('text1')} <span className="text-primary">{t('text2')}</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            {t('text3')}
          </p>
        </div>

        {/* Grid responsive améliorée */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-primary-foreground p-4 sm:p-6 rounded-lg relative min-h-[280px] flex flex-col"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 sm:top-6 right-4 sm:right-6 text-primary opacity-20">
                <Quote size={32} className="sm:w-12 sm:h-12" />
              </div>

              {/* User Info */}
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm sm:text-base">
                  {testimonial.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold flex items-center text-sm sm:text-base">
                    <span className="truncate">{testimonial.name}</span>
                    <Globe size={10} className="ml-1 text-primary flex-shrink-0" />
                    <span className="text-gray-600 text-xs ml-1 flex-shrink-0">
                      {testimonial.countryCode}
                    </span>
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 truncate">
                    {testimonial.product}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-3 sm:mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < testimonial.rating
                        ? "fill-primary text-primary"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-sm sm:text-base text-gray-700 mb-4 flex-grow leading-relaxed">
                {testimonial.text}
              </p>

              {/* Date */}
              <p className="text-xs text-gray-500 flex items-center mt-auto">
                <Clock size={10} className="mr-1 flex-shrink-0" /> 
                {testimonial.date}
              </p>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-8 md:mt-12 text-center">
          <Button className="bg-primary-foreground text-gray-800 hover:bg-primary/20 rounded-full px-6 sm:px-8 py-3 sm:py-4 font-medium text-sm sm:text-base transition-colors duration-200">
            Load More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;