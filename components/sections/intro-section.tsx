import { introData as data } from "@/data/intro.data";

export function IntroSection({
  sectionRef
}: {
  sectionRef: (el: HTMLElement | null) => void;
}) {

  
  return (
    <header
      id="intro"
      ref={sectionRef}
      className="min-h-screen flex items-center opacity-0"
    >
      <div className="grid lg:grid-cols-5 gap-16 w-full">
        <div className="lg:col-span-3 space-y-8">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground font-mono tracking-wider">
              PORTFOLIO / 2025
            </div>
            <h1 className="text-6xl lg:text-7xl font-light tracking-tight">
              {data.name.firstName}
              <br />
              <span className="text-muted-foreground">{data.name.lastName}</span>
            </h1>
          </div>

          <div className="space-y-6 max-w-md">
            <p className="text-xl text-muted-foreground leading-relaxed">
              Result Driven Software Developer skilled in
              <span className="text-foreground">
                {" "}
                Full-Stack Web Development{" "}
              </span>
              ,<span className="text-foreground"> Creative Development </span>
              and expertise in building
              <span className="text-foreground"> Scalable Web Solutions</span>.
            </p>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center animate-pulse gap-2"> {/* text-foreground*/}
                <div className={`w-2 h-2 ${data.availability.color} rounded-full animate-pulse`}></div>
                {data.availability.message}
              </div>
              {/* Uncomment this div classname and svg if you want only location */}
              <div>
                {/* <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg> */}
                {data.userlocation}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col justify-end space-y-8">
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground font-mono">
              CURRENTLY
            </div>
            <div className="space-y-2">
              <div className="text-foreground">
                {data.currently.role}
              </div>
              <div className="text-muted-foreground">
                @ {data.currently.organisation}
              </div>
              <div className="text-xs text-muted-foreground">
                2023 — Present
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-sm text-muted-foreground font-mono">FOCUS</div>
            <div className="flex flex-wrap gap-2">
              {data.technology_skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
