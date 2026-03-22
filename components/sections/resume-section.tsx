import Link from "next/link";
import Image from "next/image";

export function ResumeSection({
  sectionRef,
}: {
  sectionRef: (el: HTMLElement | null) => void;
}) {
  return (
    <section
      id="resume"
      ref={sectionRef}
      className="min-h-screen py-32 opacity-0"
    >
      <div className="space-y-16">
        <h2 className="text-4xl font-light">Resume</h2>

        <div className="flex flex-col items-center">
          <article className="group w-8/10 p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg cursor-pointer">
            <Image className={`rounded-sm brightness-65`} width={1000} height={1000} src="/Resume.jpg" alt="Resume" />
          </article>
          <div className="col-span-full w-full border-b border-border/50 hover:border-border flex items-center justify-end">
            <Link
              href="/Resume.pdf"
              download
              className="group inline-flex items-center gap-2 py-4 text-sm text-foreground animate-pulse hover:text-foreground transition-colors duration-300"
              aria-label="View full resume"
            >
              <span>View Full Resume</span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
