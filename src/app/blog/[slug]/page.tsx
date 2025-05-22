import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import {
  ArrowLeft,
  Calendar,
  Facebook,
  Linkedin,
  Twitter,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import blogPosts from "@/data/blog-data";
import BlogCard from "@/components/main/blog/BlogCard";
import Newsletter from "@/components/main/Newsletter";

interface BlogDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((post) => post.slug === slug);

  try {
    if (post) {
      return {
        title: `${post.title}` || "Crunchies : Blog Post",
        description: post.content || "Read our latest blog post.",
        openGraph: {
          title: post.title,
          description: post.content,
          images: post?.image ?? null,
        },
      };
    }
  } catch (error) {
    console.error("Error fetching post for metadata:", error);
  }

  return {
    title: "Crunchies : Blog Post",
    description: "Discover our latest articles and updates.",
  };
}

const BlogDetail = async ({ params }: BlogDetailProps) => {
  const { slug } = await params;
  const post = blogPosts.find((post) => post.slug === slug);
  const relatedPosts = blogPosts
    .filter((p) => p.category === post?.category && p.slug !== slug)
    .slice(0, 2);

  if (!post) {
    return (
      <main className="flex-grow bg-primary-foreground mt-20 lg:mt-28 flex items-center justify-center">
        <div className="text-center py-10">
          <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
          <p className="mb-6">
            Sorry, we couldn't find the blog post you're looking for.
          </p>
          <Button asChild>
            <Link href="/blog">Back to Blog</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow mt-20 lg:mt-28">
      {/* Hero Section */}
      <div className="w-full h-[400px] relative">
        <Image
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
          width={1920}
          height={400}
          priority
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-4xl">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>{post.author}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container-custom py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <article className="prose prose-lg max-w-none">
              <p className="lead">{post.excerpt}</p>
              <p>{post.content}</p>
            </article>

            {/* Tags & Share */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 py-6 border-t border-b">
              <div className="flex items-center gap-2">
                <span className="font-medium">Category:</span>
                <Link
                  href={`/blog/category/${post.category.toLowerCase()}`}
                  className="text-primary hover:underline"
                >
                  {post.category}
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-medium">Share:</span>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-8 w-8"
                  >
                    <Facebook size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-8 w-8"
                  >
                    <Twitter size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-8 w-8"
                  >
                    <Linkedin size={16} />
                  </Button>
                </div>
              </div>
            </div>

            {/* Author Info */}
            <div className="mt-8 bg-primary/5 rounded-lg p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-bold">
                  {post.author[0]}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{post.author}</h3>
                  <p className="text-gray-600">Pet Care Expert</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between">
              <Button variant="ghost" asChild>
                <Link href="/blog" className="flex items-center gap-2">
                  <ArrowLeft size={16} />
                  Back to Blog
                </Link>
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Related Posts</h3>
              <Separator className="mb-4" />
              <div className="space-y-6">
                {relatedPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Newsletter />
    </main>
  );
};

export default BlogDetail;
