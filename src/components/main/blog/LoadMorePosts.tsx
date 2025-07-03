"use client"; 

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import BlogCard from "@/components/main/blog/BlogCard";
import { useTranslations } from "next-intl"; 

interface LoadMorePostsProps {
  initialPosts: any[]; 
  allPosts: any[];   
}

const LoadMorePosts = ({ initialPosts, allPosts }: LoadMorePostsProps) => {
  const t = useTranslations('pages.Blog');
  const [displayedPostsCount, setDisplayedPostsCount] = useState(initialPosts.length);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = () => {
    setIsLoading(true); 
    setTimeout(() => {
      setDisplayedPostsCount(allPosts.length);
      setIsLoading(false);
    }, 500);
  };


  const currentPosts = allPosts.slice(0, displayedPostsCount);
  const showLoadMoreButton = allPosts.length > displayedPostsCount;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {currentPosts.map((post: any) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {showLoadMoreButton && ( 
        <div className="mt-10 flex justify-center">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-8"
            onClick={handleLoadMore} 
            disabled={isLoading}
          >
            {isLoading ? t('loading') : t('loadMore')} 
          </Button>
        </div>
      )}
    </>
  );
};

export default LoadMorePosts;