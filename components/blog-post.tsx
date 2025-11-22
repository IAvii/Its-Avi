"use client"

import { formatBlogDate } from '@/lib/format-blog-date';
import { getPostBySlug } from '@/lib/hashnode-requests'
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react'

export default function BlogPost({slug}: {slug: string | string[]}) {

  const { data } = useQuery({
    queryKey: ['post', slug],
    queryFn: () => getPostBySlug(slug), 
  });

  if (!data) {
    return <p className="text-center text-muted-foreground">Blog not found.</p>;
  }

  return (
    <div className="space-y-16">
          <h2 className="text-4xl font-light">{data.title}</h2>

          <div className="gap-8">
            <article className="group p-8 transition-all duration-500 hover:shadow-lg">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                  <span>{formatBlogDate(data.publishedAt)}</span>
                  <span>{data.readTimeInMinutes}</span>
                </div>

                <h3 className="text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                  {data.subtitle}
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  {data.content.markdown}
                </p>
              </div>
            </article>
          </div>

          {/* Add a full-width bottom row with a right-aligned "Go back" link styled like the home page "Read more" with arrow */}
          <div className="col-span-full w-full border-b border-border/50 hover:border-border">
            <div className="flex justify-start">
              <Link
                href="/blogs"
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
          </div>
        </div>
  )
}
