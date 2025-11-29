interface Experience {
  year: string;
  role_Name: string;
  link?: string;
  deployment: {
    status: boolean;
    message?: string;
    statusColor?: string;
  };
  company_Subtitle: string;
  description: string;
  techUsed: string[];
}


export const experienceData: Experience[] = [
  {
    year: "Present",
    role_Name: "Should I Bunk?",
    link: "https://github.com/Xzy-Vron/bunc",
    company_Subtitle: "Full Stack MERN Project",
    description:
      "Creating a web application that provide students with detailed analysis of their attendance and lecture summaries provided by students, for students.",
    techUsed: ["React", "Express.js", "MongoDB", "Node.js", "Recharts"],
    deployment: {
      status: false,
      message: "Not yet Deployed",
      statusColor: "bg-red-500"
    },
  },


  {
    year: "2025",
    role_Name: "Whispr",
    link: "https://whispr-tau.vercel.app/",
    company_Subtitle: "Full Stack Next.js Project",
    description:
      "Built a Full-stack web application that enables users to share and receive honest, anonymous feedback through secure links. Built with modern web technologies, intuitive design, and seamless user experience.",
    techUsed: ["Next.js", "React", "Typescript", "MongoDB", "NextAuth", "Resend", "Shadcn"],
    deployment: {
      status: true,
    },
  },


  {
    year: "2025",
    role_Name: "CampScape",
    link: "https://camp-scape.vercel.app/",
    company_Subtitle: "Backend Project",
    description:
      "Built a web application where users can explore, create, and review campgrounds. Implemented user authentication, CRUD operations, and interactive map integration to deliver a real-world marketplace experience.",
    techUsed: ["Express.js", "MongoDB", "Node.js", "REST API", "Maptiler", "Passport"],
    deployment: {
      status: true,
    },
  },
  
  {
    year: "2024",
    role_Name: "Creative Portfolio",
    link: "https://xzy-vron.github.io/creative-portfolio-demo/",
    company_Subtitle: "Frontend UI/UX Design",
    description:
      "Developed an animated portfolio design.",
    techUsed: ["GSAP","JavaScript"],
    deployment: {
      status: true,
    },
  },
];

