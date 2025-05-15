import React from "react";
import { Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Luxury Pet Bed",
    slug: "luxury-pet-bed",
    category: "Dogs",
    price: 59.99,
    image:
      "https://images.unsplash.com/photo-1526948531399-320e7e40f0ca?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
    rating: 5,
  },
  {
    id: 2,
    name: "Interactive Cat Toy",
    slug: "interactive-cat-toy",
    category: "Cats",
    price: 24.99,
    image:
      "https://images.unsplash.com/photo-1560807707-8cc77767d783?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
    rating: 4,
  },
  {
    id: 3,
    name: "Bird Training Kit",
    slug: "bird-training-kit",
    category: "Birds",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1522858547137-f1dcec554f55?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
    rating: 5,
  },
  {
    id: 4,
    name: "Aquarium Plants Set",
    slug: "aquarium-plants-set",
    category: "Fish",
    price: 19.99,
    image:
      "https://images.unsplash.com/photo-1596034583565-c6b6032ba7a1?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
    rating: 4,
  },
];

const NewArrivals = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">
            New <span className="text-primary">Arrivals</span>
          </h2>
          <p className="section-subtitle">
            Check out our latest pet products and accessories
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white border border-primary/10 rounded-lg overflow-hidden hover:shadow-sm transition-all"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <Button size="sm" variant="default" asChild>
                    <Link href={`/product/${product.slug}`}>Shop Now</Link>
                  </Button>
                  <button className="h-10 w-10 rounded-full bg-white flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <Heart size={18} />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <Link
                  href={`/product/${product.slug}`}
                  className="block mb-1 text-sm hover:text-primary hover:underline transition-colors"
                >
                  {product.category}
                </Link>
                <Link
                  href={`/product/${product.slug}`}
                  className="block mb-2 text-lg font-semibold hover:text-primary hover:underline transition-colors"
                >
                  {product.name}
                </Link>

                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < product.rating
                          ? "fill-primary text-primary"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>

                <span className="text-primary font-medium text-lg">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
