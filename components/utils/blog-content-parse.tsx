import Image from "next/image";
import {
  domToReact,
  DOMNode,
  Element,
  HTMLReactParserOptions,
} from "html-react-parser";

const OPTIMIZED_IMAGE_HOSTS = new Set([
  "cdn.hashnode.com",
  "images.hashnode.com",
  "static.hashnode.com",
]);

const isOptimizedImageHost = (src: string) => {
  try {
    const url = new URL(src);
    return (
      OPTIMIZED_IMAGE_HOSTS.has(url.hostname) ||
      url.hostname.endsWith(".hashnode.dev")
    );
  } catch {
    return false;
  }
};

const getImageCaption = (alt: string) => {
  const value = alt.trim();

  if (!value) {
    return "";
  }

  const normalized = value.toLowerCase();
  if (normalized === "hello" || normalized === "image") {
    return "";
  }

  return value;
};

const parseDimension = (value?: string) => {
  const num = Number(value);
  return Number.isFinite(num) && num > 0 ? num : undefined;
};

const options: HTMLReactParserOptions = {
  replace: (domNode: DOMNode) => {
    if (!(domNode instanceof Element)) {
      return;
    }

    if (domNode.name === "h1") {
      return (
        <h1 className="mt-8 mb-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl text-left text-foreground">
          {domToReact(domNode.children as DOMNode[], options)}
        </h1>
      );
    }

    if (domNode.name === "h2") {
      return (
        <h2 className="mt-8 mb-3 text-2xl font-semibold leading-snug tracking-normal text-foreground text-left">
          {domToReact(domNode.children as DOMNode[], options)}
        </h2>
      );
    }

    if (domNode.name === "p") {
      const parent = domNode.parent as Element | undefined;
      if (parent?.name === "li") {
        return (
          <p className="my-1 text-[15px] leading-7 text-muted-foreground sm:text-base">
            {domToReact(domNode.children as DOMNode[], options)}
          </p>
        );
      }
      return (
        <p className="my-4 text-[15px] leading-7 text-muted-foreground sm:text-base">
          {domToReact(domNode.children as DOMNode[], options)}
        </p>
      );
    }

    if (domNode.name === "ol") {
      return (
        <ol className="my-4 ml-8 flex list-decimal flex-col gap-0 pl-2 text-muted-foreground sm:ml-8">
          {domToReact(domNode.children as DOMNode[], options)}
        </ol>
      );
    }

    if (domNode.name === "ul") {
      return (
        <ul className="my-4 ml-8 flex list-disc flex-col gap-0 pl-2 text-muted-foreground sm:ml-8">
          {domToReact(domNode.children as DOMNode[], options)}
        </ul>
      );
    }

    if (domNode.name === "li") {
      return (
        <li className="leading-7 text-foreground">
          {domToReact(domNode.children as DOMNode[], options)}
        </li>
      );
    }

    if (domNode.name === "blockquote") {
      return (
        <blockquote className="my-6 rounded-sm border-l-4 border-border bg-accent/30 py-3 pl-4 italic text-muted-foreground">
          {domToReact(domNode.children as DOMNode[], options)}
        </blockquote>
      );
    }

    if (domNode.name === "img") {
      const src = domNode.attribs?.src;
      const alt = domNode.attribs?.alt || "";

      // Skip images with empty src
      if (!src || src.trim() === "") {
        return <></>;
      }

      const parent = domNode.parent as Element | undefined;
      const isInParagraph = Boolean(parent && parent.name === "p");
      const caption = getImageCaption(alt);
      const width = parseDimension(domNode.attribs?.width) ?? 1440;
      const height = parseDimension(domNode.attribs?.height) ?? 900;
      const imageClassName =
        "h-auto w-full rounded-sm border border-border/50 bg-muted/20 shadow-sm";

      const imageNode = isOptimizedImageHost(src) ? (
        <Image
          src={src}
          alt={alt || "Blog illustration"}
          width={width}
          height={height}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 85vw, 760px"
          className={imageClassName}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt || "Blog illustration"}
          loading="lazy"
          decoding="async"
          width={width}
          height={height}
          className={imageClassName}
        />
      );

      // If image is inside a paragraph, keep span wrappers to avoid invalid p > figure markup.
      if (isInParagraph) {
        return (
          <span className="my-6 block w-full">
            <span className="mx-auto block w-full max-w-3xl">
              {imageNode}
            </span>
            {caption && (
              <span className="mt-2 block text-center text-sm text-muted-foreground">
                {caption}
              </span>
            )}
          </span>
        );
      }

      return (
        <figure className="my-8 w-full">
          <div className="mx-auto w-full max-w-3xl">{imageNode}</div>
          {caption && (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    }

    if (domNode.name === "pre") {
      let className = domNode.attribs?.class || "";

      // If pre doesn't have language class, check if code child has it
      if (!className.includes("language-")) {
        const codeChild = domNode.children.find(
          (child) => child.type === "tag" && child.name === "code"
        ) as Element | undefined;

        if (codeChild) {
          className = codeChild.attribs?.class || "";
        }
      }

      const languageMatch = className.match(/(?:language|lang)-(\w+)/);
      const language = languageMatch ? languageMatch[1] : "text";

      return (
        <div className="code-wrapper my-4 w-full overflow-hidden rounded-md border border-neutral-800">
          <div className="code-header h-7 flex items-center bg-[#383434]">
            <span className="language-badge  text-muted-foreground pl-2 text-xs">
              {language}
            </span>
          </div>
          <div className="overflow-x-auto ">
            <pre
              {...domNode.attribs}
              className="text-[11px] text-neutral-50 sm:text-[14px] md:text-sm font-mono m-0 w-full border-0 rounded-b-md overflow-x-auto"
            >
              {domToReact(domNode.children as DOMNode[], options)}
            </pre>
          </div>
        </div>
      );
    }

    if (domNode.name === "code") {
      const parent = domNode.parent as Element | undefined;
      if (!parent || parent.name !== "pre") {
        return (
          <code className="rounded-md bg-neutral-950 px-1.5 py-0.5 font-mono text-[0.9em] text-neutral-50">
            {domToReact(domNode.children as DOMNode[], options)}
          </code>
        );
      }
    }
  },
};

export { options };
