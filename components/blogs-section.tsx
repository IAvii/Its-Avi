"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import axios from "axios"
import { formatBlogDate } from "@/lib/format-blog-date"
import PageLoader from "./page-loader"
import { useQuery } from "@tanstack/react-query"
import { getPosts } from "@/lib/hashnode-requests"
import BlogCard from "./blog-card"


interface Blog {
  _id: string
  title: string
  subtitle: string
  createdAt: string
  readTime: string
}

export function BlogsSection({
  sectionRef, setLoading

}: {
  sectionRef: (el: HTMLElement | null) => void
  setLoading: (loading: boolean) => void
}) {

  // const [num, setData] = useState<Blog[] | null>(null);

  // useEffect(() => {
  //   const fetchBlogs = async () => {
  //     try {
  //       const response = await axios.get("/api/user-blogs");
  //       const data = response.data.blogs;
  //       setData(data);
  //     } catch (error) {
  //       console.error("Error fetching blogs:", error);
  //     }finally {
  //       setLoading(false)
  //     }
  //   }
  //   fetchBlogs();
  // }, []);

  const { data, isLoading } = useQuery({
    queryKey: ['postSectionBlogs'],
    queryFn: () => getPosts({ first: 4 }), 
  });

  if (!data) return <PageLoader />


  return (
    <section id="thoughts" ref={sectionRef} className="min-h-screen py-32 opacity-0">
      <div className="space-y-16">
        <h2 className="text-4xl font-light">Recent Blogs</h2>

        <div className="grid lg:grid-cols-2 gap-8">
          {data.posts.map((blog, index) => (
            <BlogCard key={blog.node.id} blog={blog.node} />
          ))}
          <div className="col-span-full w-full border-b border-border/50 hover:border-border flex items-center justify-end">
            <Link
              href="/blogs"
              className="group inline-flex items-center gap-2 py-4 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              aria-label="Read more blog posts"
            >
              <span>View all</span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
