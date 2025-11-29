
interface Connect {
  email: string
  socials: {
    name: string
    handle: string
    url: string
  }[]
}


export const connect : Connect = {
  email: "avinashganore@gmail.com",
  socials: [
    {
      name: "GitHub",
      handle: "@Xzy-Vron",
      url: "https://github.com/Xzy-Vron"
    },
    {
      name: "Twitter",
      handle: "@XzyVron",
      url: "https://x.com/XzyVron"
    },
    {
      name: "LinkedIn",
      handle: "avinash-ganore",
      url: "https://www.linkedin.com/in/avinash-ganore/"
    },
    {
      name: "WhatsApp",
      handle: "+91 9284652931",
      url: "https://wa.me/9284652931"
    },
  ]
}
