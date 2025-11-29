
interface IntroData {
  name: {
    firstName: string
    lastName: string
  }
  availability: {
    message: string
    color: string
  }
  userlocation: string
  technology_skills: string[]
  currently: {
    role: string
    organisation: string
  }
}



export const introData : IntroData = {
  name: {
    firstName: "Avinash",
    lastName: "Ganore",
  },
  availability: {
    message: "Open for Internships",
    color: "bg-green-500",
  },
  userlocation: "Pune, Maharashtra",
  technology_skills: [
    "React",
    "TypeScript",
    "Next.js",
    "Node.js",
    "JavaScript",
    "Java",
    "MongoDB",
    "GSAP",
    "Framer",
  ],
  currently: {
    role: "Electronics and Telecommunication Student",
    organisation: "Savitribai Phule Pune University",
  },
};
