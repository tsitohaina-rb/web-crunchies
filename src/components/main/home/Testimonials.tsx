import React from "react";
import { Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "John Smith",
    role: "Dog Owner",
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2662&auto=format&fit=crop&ixlib=rb-4.0.3",
    rating: 5,
    text: "I've been shopping at Crunchies for over a year now, and I'm amazed by the quality of their products. My dog absolutely loves the toys and treats I get from here!",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Cat Owner",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
    rating: 5,
    text: "The cat supplies from Crunchies are simply the best. The delivery is always on time, and their customer service team is incredibly helpful whenever I have questions.",
  },
  {
    id: 3,
    name: "Michael Brown",
    role: "Bird Enthusiast",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
    rating: 5,
    text: "I appreciate the wide selection of bird supplies available at Crunchies. They have everything I need for my feathered friends at competitive prices.",
  },
  {
    id: 4,
    name: "John Smith",
    role: "Dog Owner",
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2662&auto=format&fit=crop&ixlib=rb-4.0.3",
    rating: 5,
    text: "I've been shopping at Crunchies for over a year now, and I'm amazed by the quality of their products. My dog absolutely loves the toys and treats I get from here!",
  },
  {
    id: 5,
    name: "Sarah Johnson",
    role: "Cat Owner",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
    rating: 4,
    text: "The cat supplies from Crunchies are simply the best. The delivery is always on time, and their customer service team is incredibly helpful whenever I have questions.",
  },
  {
    id: 6,
    name: "Michael Brown",
    role: "Bird Enthusiast",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
    rating: 5,
    text: "I appreciate the wide selection of bird supplies available at Crunchies. They have everything I need for my feathered friends at competitive prices.",
  },
];

const Testimonials = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">
            What Our <span className="text-primary">Customers Say</span>
          </h2>
          <p className="section-subtitle">
            Read testimonials from our happy customers and their pets
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className=" bg-primary-foreground p-6 rounded-lg relative"
            >
              <div className="absolute top-6 right-6 text-primary opacity-20">
                <Quote size={48} />
              </div>

              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-14 w-14 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm ">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < testimonial.rating
                        ? "fill-primary text-primary"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>

              <p className="">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-12 text-center">
        <Button className="bg-primary-foreground text-gray-800 hover:bg-primary/20 rounded-full px-8 py-6 font-medium">
          View All Reviews
        </Button>
      </div>
    </section>
  );
};

export default Testimonials;
