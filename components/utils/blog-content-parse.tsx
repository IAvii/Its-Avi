import parse, {
  domToReact,
  DOMNode,
  Element,
  HTMLReactParserOptions,
} from "html-react-parser";

const options: HTMLReactParserOptions = {
  replace: (domNode: DOMNode) => {
    if (!(domNode instanceof Element)) {
      return;
    }

    if (domNode.name === "h1") {
      return (
        <h1 className="text-4xl text-center tracking-tight">
          {domToReact(domNode.children as DOMNode[], options)}
        </h1>
      );
    }

    if (domNode.name === "h2") {
      return (
        <h2 className="text-2xl text-foreground tracking-normal">
          {domToReact(domNode.children as DOMNode[], options)}
        </h2>
      );
    }

    if (domNode.name === "ol") {
      return (
        <ol className="list-decimal flex flex-col mx-10 gap-2">
          {domToReact(domNode.children as DOMNode[], options)}
        </ol>
      );
    }

    if (domNode.name === "ul") {
      return (
        <ul className="list-disc flex flex-col mx-10 gap-2">
          {domToReact(domNode.children as DOMNode[], options)}
        </ul>
      );
    }

    if (domNode.name === "blockquote") {
      return (
        <blockquote className="pl-5 italic border-l-2 border-neutral-600">
          {domToReact(domNode.children as DOMNode[], options)}
        </blockquote>
      );
    }

    if (domNode.name === "img") {
      const src = domNode.attribs?.src;
      const alt = domNode.attribs?.alt || "Hello";

      // Skip images with empty src
      if (!src || src.trim() === "") {
        return <></>;
      }

      const parent = domNode.parent as Element | undefined;

      // If image is inside a paragraph, we need to break out of it
      // Return a div wrapper instead
      if (parent && parent.name === "p") {
        return (
          <span className="block w-1/2 mx-auto py-2  flex-col items-center pt-4 max-w-md sm:max-w-lg">
            <img src={src} alt={alt} className="rounded-sm w-full" />
            {alt && <span className="block text-center">{alt}</span>}
          </span>
        );
      }

      return (
        <div className="flex flex-col items-center pt-4 w-full max-w-md sm:max-w-lg mx-auto">
          <img src={src} alt={alt} className="w-1/2 mx-auto rounded-xs py-2" />
          <p>{alt}</p>
        </div>
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

      const languageMatch = className.match(/lang-(\w+)/);
      const language = languageMatch ? languageMatch[1] : "";

      return (
        <div className="code-wrapper overflow-hidden my-2 w-full border border-neutral-800 rounded-md">
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

    if (domNode.name === "pre") {
      const className = domNode.attribs?.class || "";
      const language = className.match(/language-(\w+)/)?.[1] || "text";

      return (
        <div className="my-2 w-full border border-neutral-800 rounded-md">
          <div className="flex justify-between items-center px-4 py-2 bg-neutral-900 border-b border-neutral-800 rounded-t-md">
            <span className="text-xs font-mono text-neutral-400">
              {language}
            </span>
          </div>
          <pre
            {...domNode.attribs}
            className="text-[11px] text-neutral-50 sm:text-[14px] md:text-sm overflow-scroll font-mono m-0 w-full border-0 rounded-b-md overflow-x-auto"
          >
            {domToReact(domNode.children as DOMNode[], options)}
          </pre>
        </div>
      );
    }

    if (domNode.name === "code") {
      const parent = domNode.parent as Element | undefined;
      if (!parent || parent.name !== "pre") {
        return (
          <code className="bg-neutral-950 text-neutral-50 rounded-md py-0.5 px-1 font-mono">
            {domToReact(domNode.children as DOMNode[], options)}
          </code>
        );
      }
    }
  },
};

export { options };
