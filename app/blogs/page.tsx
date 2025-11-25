"use client";

import BlogPosts from "@/components/blog-posts";
import PageLoader from "@/components/page-loader";
import { formatBlogDate } from "@/lib/format-blog-date";
import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useRef, useState } from "react";


export default function Page() {
  const [activeSection, setActiveSection] = useState("");
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  const [loading, setLoading] = useState(true);

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


  return (
    <main className="max-w-4xl mx-auto px-8 lg:px-16">
      <section
        id="thoughts"
        ref={(el) => {
          sectionsRef.current[2] = el;
        }}
        className="min-h-screen py-32"
      >
        <BlogPosts setLoading={setLoading} />
      </section>
    </main>
  );
}
