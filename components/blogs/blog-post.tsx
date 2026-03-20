"use client"

import { formatBlogDate } from '@/lib/format-blog-date';
import { getPostBySlug } from '@/lib/hashnode-requests'
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useRouter } from 'next/navigation';
import Article from './article';

export default function BlogPost({slug}: {slug: string | string[]}) {
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ['post', slug],
    queryFn: () => getPostBySlug(slug), 
  });

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    router.push('/blogs');
  };

  if (!data) {
    return <p className="text-center text-muted-foreground">Blog not found.</p>;
  }

  return (
    <div className="space-y-12">
          <h2 className="text-4xl sm:text-5xl font-light">{data.title}</h2>

          <div className="gap-8">
            <article className="group sm:p-8 transition-all duration-500 hover:shadow-lg">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground pb-2 font-mono border-b border-border/50 hover:border-border">
                  <span>{formatBlogDate(data.publishedAt)}</span>
                  <span>{data.readTimeInMinutes} min read</span>
                </div>

                <h3 className="text-2xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                  {data.subtitle}
                </h3>

                <Article content={data.content.html} />
              </div>
            </article>
          </div>

          <div className="col-span-full w-full border-b border-border/50 hover:border-border">
            <div className="flex justify-start">
              <button
                type="button"
                onClick={handleGoBack}
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
              </button>
            </div>
          </div>
        </div>
  )
}
