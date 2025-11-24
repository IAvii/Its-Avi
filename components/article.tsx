"use client";

import { useEffect } from "react";
import parse from "html-react-parser";
import { options } from "./blog-content-parse";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css"; // Choose your theme

export default function Article({ content }: { content: string }) {
  useEffect(() => {
    // Highlight all code blocks

    hljs.highlightAll();
  }, [content]);

  return (
    <div className="text-foreground leading-relaxed">
      <article className="article flex flex-col gap-3 text-base tracking-wide mb-2 mx-auto   max-w-none mt-6 opacity-80">
        {parse(content, options)}
      </article>
    </div>
  );
}
