import React from "react";
import { Calendar, User, ArrowRight } from "lucide-react";
import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    title: "How to Choose the Right Food for Your Dog",
    slug: "choose-right-dog-food",
    excerpt:
      "Learn about the nutritional needs of different dog breeds and how to select the best food for your furry friend.",
    image:
      "https://images.unsplash.com/photo-1610020321815-a64111a3d003?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
    date: "May 10, 2023",
    author: "Dr. Sarah Wilson",
  },
  {
    id: 2,
    title: "Tips for Training Your New Kitten",
    slug: "training-new-kitten",
    excerpt:
      "Bringing home a new kitten? Here are some essential training tips to help them adjust to their new environment.",
    image:
      "https://images.unsplash.com/photo-1591116302387-58db066ced5f?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
    date: "April 28, 2023",
    author: "Mark Johnson",
  },
  {
    id: 3,
    title: "Common Health Issues in Goldfish and How to Prevent Them",
    slug: "goldfish-health-issues",
    excerpt:
      "Understanding common health problems that affect goldfish and the steps you can take to keep your aquatic pets healthy.",
    image:
      "https://images.unsplash.com/photo-1603899968034-1c1bde1b5f89?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
    date: "April 15, 2023",
    author: "Dr. Michael Lee",
  },
];

const BlogSection = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">
            Our <span className="text-primary">Pet Blog</span>
          </h2>
          <p className="section-subtitle">
            Read our latest articles on pet care, training, and health
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="group bg-white border border-primary/10 rounded-lg overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
              </div>

              <div className="p-5">
                <div className="flex items-center text-sm  mb-3">
                  <div className="flex items-center mr-4">
                    <Calendar size={14} className="mr-1" />
                    {post.date}
                  </div>
                  <div className="flex items-center">
                    <User size={14} className="mr-1" />
                    {post.author}
                  </div>
                </div>

                <Link href={`/blog/${post.slug}`}>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                </Link>

                <p className=" mb-4">{post.excerpt}</p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-primary font-medium hover:underline"
                >
                  Read More <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center px-8 py-3 border-2 border-primary/10 rounded-full hover:border-primary hover:text-primary transition-colors font-medium"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
