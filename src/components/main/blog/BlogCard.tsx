import React from "react";
import blogPosts from "@/data/blog-data";
import { ArrowRight, Calendar, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

const BlogCard = ({ post }: { post: (typeof blogPosts)[0] }) => {
  const t = useTranslations('components.main.blog.BlogCard');
  return (
    <div className="group bg-white border border-primary/10 rounded-lg overflow-hidden hover:shadow-sm transition-all">
      <div className="h-48 overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform group-hover:scale-110"
          width={500}
          height={300}
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
          {t('text1')} <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
