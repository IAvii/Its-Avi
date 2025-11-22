"use client";

import BlogPosts from "@/components/blog-posts";
import PageLoader from "@/components/page-loader";
import { formatBlogDate } from "@/lib/format-blog-date";
import axios from "axios";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface Blogs {
  _id: string;
  title: string;
  subtitle: string;
  createdAt: string;
  readTime: string;
}

export default function Page() {
  // const [isDark, setIsDark] = useState(true)
  const [activeSection, setActiveSection] = useState("");
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  const [data, setData] = useState<Blogs[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/api/user-blogs");
        const data = response.data.blogs;
        setData(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // useEffect(() => {
  //   document.documentElement.classList.toggle("dark", isDark)
  // }, [isDark])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [loading]);

  // const toggleTheme = () => {
  //   setIsDark(!isDark)
  // }

  if (loading) return <PageLoader />;
  if (!data) return <PageLoader />;

  return (
    <main className="max-w-4xl mx-auto px-8 lg:px-16">
      <section
        id="thoughts"
        ref={(el) => {
          sectionsRef.current[2] = el;
        }}
        className="min-h-screen py-32 opacity-0"
      >
        <BlogPosts />
      </section>
    </main>
  );
}
