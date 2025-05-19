import React from "react";
import Link from "next/link";
import blogPosts from "@/data/blog-data";
import BlogCard from "../blog/BlogCard";

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
          {blogPosts.slice(0, 3).map((post) => (
            <BlogCard key={post.id} post={post} />
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
