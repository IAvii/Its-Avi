import { experienceData as data } from "@/data/experience.data"

export function ExperienceSection({
  sectionRef
}: {
  sectionRef: (el: HTMLElement | null) => void
}) {


  return (
    <section id="work" ref={sectionRef} className="min-h-screen py-32 opacity-0">
      <div className="space-y-16">
        <div className="flex items-end justify-between">
          <h2 className="text-4xl font-light">Projects</h2>
          <div className="text-sm text-muted-foreground font-mono">2023 — Present</div>
        </div>

        <div className="space-y-12">
          {data.map((experience, index) => (
            <a href={experience.link} key={index}>
            <div
              className="group grid lg:grid-cols-12 gap-8 py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
            >
              <div className="lg:col-span-2">
                <div className="text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                  {experience.year}
                </div>
              </div>

              <div className="lg:col-span-6 space-y-3">
                <div>
                  <h3 className="text-xl font-medium">{experience.role_Name}</h3>
                  <div className="text-muted-foreground">{experience.company_Subtitle}{" "}</div>
                </div>
                <p className="text-muted-foreground leading-relaxed max-w-lg">{experience.description}</p>
                {!experience.deployment.status && (
                          <>
                            <div className="flex items-center animate-pulse justify-start pt-1 gap-2">
                              <div className={`w-2 h-2 ${experience.deployment.statusColor} rounded-full animate-pulse`}></div>
                              <span className="text-xs text-foreground">
                                {experience.deployment.message}
                              </span>
                            </div>
                          </>
                        )}
              </div>

              <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end">
                {experience.techUsed.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs text-muted-foreground rounded group-hover:border-muted-foreground/50 transition-colors duration-500"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </a>
          ))}
        </div>
      </div>
    </section>
  )
}
