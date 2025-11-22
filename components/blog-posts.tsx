"use client";

import PageLoader from "@/components/page-loader";
import { getPosts } from "@/lib/hashnode-requests";
import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";
import BlogCard from "./blog-card";
import { CloudCheck, Loader } from "lucide-react";

export default function BlogPosts() {
  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    getNextPageParam: (lastPage) =>
      lastPage.length < 9 ? undefined : lastPage[lastPage.length - 1].cursor,
    initialPageParam: "",
  });

  if (!data) {
    return <PageLoader />;
  }

  return (
    <div className="space-y-16">
      <h2 className="text-4xl font-light">Blogs</h2>

      <div className="grid lg:grid-cols-2 gap-8">
        {data.pages.map((page) =>
          page.map((blog) => <BlogCard key={blog.node.id} blog={blog.node} />)
        )}
        <div className="col-span-full w-full border-b border-border/50 hover:border-border flex items-center justify-between">
          <div className="flex justify-start">
            <Link
              href="/"
              aria-label="Go back to blogs list"
              className="group flex items-center gap-2 py-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg
                className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 8l-4 4m0 0l4 4m-4-4H21"
                />
              </svg>
              <span>Go back</span>
            </Link>
          </div>
          <button
            disabled={!hasNextPage || isFetching}
            onClick={() => {
              fetchNextPage();
            }}
            aria-label="Go back to blogs list"
            className="group flex items-center gap-2 py-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {isFetching ? (
              <>
                <Loader size={14} className="animate-spin group-hover:-translate-x-1" />
                <span>Fetching...</span>
              </>
            ) : hasNextPage ? (
              <>
                <svg
                  className="w-4 h-4 transform group-hover:translate-y-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 17l4 4m0 0l4-4m-4 4V3"
                  />
                </svg>
                <span>Load more</span>
              </>
            ) : (
              <>
                <CloudCheck size={16} />
                <span>All loaded</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
