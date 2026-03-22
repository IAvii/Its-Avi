"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { IntroSection } from "@/components/sections/intro-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { BlogsSection } from "@/components/sections/blogs-section";
import { ResumeSection } from "@/components/sections/resume-section";
import { ConnectSection } from "@/components/sections/connect-section";
import Lenis from "lenis";
import Introloading from "@/components/loaders/intro-loader";
import PageLoader from "@/components/loaders/page-loader";
import SiteFooter from "@/components/footer/site-footer";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandX,
  IconExchange,
  IconHome,
    IconUser,
  IconBrandProducthunt,
  IconArticle,
  IconConnection ,
  IconFileCv ,
} from "@tabler/icons-react";


export default function Home() {
  const [activeSection, setActiveSection] = useState("");
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const revealedSectionsRef = useRef<Set<string>>(new Set());

  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const loadingTimer = setTimeout(() => {
  //     setLoading(false);
  //   }, 4100);

  //   return () => clearTimeout(loadingTimer);
  // }, []);

  const sectionIds = useMemo(
    () => ["intro", "projects", "blogs", "resume", "connect"],
    []
  );

  const sectionRefCallbacks = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => (el: HTMLElement | null) => {
        sectionsRef.current[i] = el;
      }),
    []
  );

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).id;
            setActiveSection((prev) => (prev === id ? prev : id));

            // Reveal animation should play only once per section.
            if (!revealedSectionsRef.current.has(id)) {
              entry.target.classList.add("animate-fade-in-up");
              revealedSectionsRef.current.add(id);
            }
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

  const onNavClick = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // if (loading) return <PageLoader />;

  const links = [
    {
      title: "Intro",
      icon: (
        <IconUser className="h-full w-full text-dock-icon" />
      ),
      href: "#intro",
    },

    {
      title: "Projects",
      icon: (
        <IconBrandProducthunt className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#projects",
    },
    {
      title: "Blogs",
      icon: (
        <IconArticle className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#blogs",
    },
    {
      title: "Resume",
      icon: (
        <IconFileCv className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#resume",
    },
    {
      title: "Connect",
      icon: (
        <IconConnection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#connect",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-4">
          {sectionIds.map((section) => (
            <button
              key={section}
              onClick={() => onNavClick(section)}
              className={`w-2 h-8 rounded-full transition-all duration-500 ${
                activeSection === section
                  ? "bg-foreground"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Navigate to ${section}`}
            />
          ))}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-8 lg:px-16">
        <IntroSection sectionRef={sectionRefCallbacks[0]} />
        <ExperienceSection sectionRef={sectionRefCallbacks[1]} />
        <BlogsSection sectionRef={sectionRefCallbacks[2]} />
        <ResumeSection sectionRef={sectionRefCallbacks[3]} />
        <ConnectSection sectionRef={sectionRefCallbacks[4]} />

        <SiteFooter />
      </main>

      <FloatingDock
        items={links}
        desktopClassName="fixed left-1/2 bottom-6 z-50 -translate-x-1/2"
       
      />
    </div>
  );
}
