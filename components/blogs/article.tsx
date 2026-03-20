"use client";

import { useEffect } from "react";
import parse from "html-react-parser";
import { options } from "../utils/blog-content-parse";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css"; // Choose your theme

export default function Article({ content }: { content: string }) {
  useEffect(() => {
    // Highlight all code blocks

    hljs.highlightAll();
  }, [content]);

  return (
    <div className="text-foreground">
      <article className="article mx-auto mt-6 text-base">
        {parse(content, options)}
      </article>
    </div>
  );
}
