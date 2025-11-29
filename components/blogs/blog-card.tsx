import { formatBlogDate } from "@/lib/format-blog-date";
import { PostsMetadata } from "@/types/hashnode-request";
import Link from "next/link";
import React from "react";

export default function BlogCard({ blog }: { blog: PostsMetadata }) {
  return (
    <Link href={`/blogs/${blog.slug}`} aria-label={`Read more about ${blog.title}`}>
      <article className="group p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg cursor-pointer">
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
            <span>{formatBlogDate(blog.publishedAt)}</span>
            <span>{blog.readTimeInMinutes} min</span>
          </div>

          <h3 className="text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
            {blog.title}
          </h3>

          <p className="text-muted-foreground leading-relaxed">
            {blog.subtitle}
          </p>

          <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
            <span>Read more</span>
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}
