import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import React from "react";
import blogPosts from "@/data/blog-data";
import BlogCard from "@/components/main/blog/BlogCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Newsletter from "@/components/main/Newsletter";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Blog - Crunchies",
  description: "Explore insights, updates, and expert tips from the Crunchies team. Stay informed with our latest blog posts and industry news.",
};

const BlogPage = async () => {
  const t = await getTranslations('pages.Blog');

  return (
    <div className="flex-grow mt-20 lg:mt-28">
      <div className="bg-primary-foreground py-16 relative">
        <div className="container-custom">
          <h2 className="section-title text-center">
            {t('titlePrefix')} <span className="text-primary">{t('titleMain')}</span>
          </h2>
          <p className="text-lg text-center max-w-2xl mx-auto text-petio-text">
            {t('subtitle')}
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

      <div className="container-custom py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Blog Posts Grid */}
          <div className="lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <Button variant="outline" size="lg" className="rounded-full px-8">
                {t('loadMore')}
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white border border-petio-border rounded-lg p-6">
              <form className="flex gap-x-1 mb-4">
                <Input
                  type="email"
                  placeholder={t('searchPlaceholder')}
                  className="bg-white border-primary/10 focus-visible:ring-primary"
                  required
                />
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/95 text-white flex-shrink-0"
                >
                  <Search size={18} />
                </Button>
              </form>
              <h3 className="text-xl font-semibold mb-4">{t('categoriesTitle')}</h3>
              <Separator className="mb-4" />
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/blog/category/dogs"
                    className="text-petio-text hover:text-primary transition-colors"
                  >
                    {t('categories.dogs')} ({t('categories.dogsCount')})
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/category/cats"
                    className="text-petio-text hover:text-primary transition-colors"
                  >
                    {t('categories.cats')} ({t('categories.catsCount')})
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/category/healthcare"
                    className="text-petio-text hover:text-primary transition-colors"
                  >
                    {t('categories.healthcare')} ({t('categories.healthcareCount')})
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/category/general"
                    className="text-petio-text hover:text-primary transition-colors"
                  >
                    {t('categories.general')} ({t('categories.generalCount')})
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-petio-border rounded-lg p-6 mt-8">
              <h3 className="text-xl font-semibold mb-4">{t('popularPostsTitle')}</h3>
              <Separator className="mb-4" />
              <ul className="space-y-4">
                {blogPosts.slice(0, 3).map((post) => (
                  <li key={post.id} className="flex gap-3">
                    <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="font-medium text-sm hover:text-primary transition-colors"
                      >
                        {post.title}
                      </Link>
                      <div className="text-xs text-petio-text mt-1">
                        {post.date}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Newsletter />
    </div>
  );
};

export default BlogPage;
