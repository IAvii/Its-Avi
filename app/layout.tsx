import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import SiteFooter from "@/components/footer/site-footer"
import QueryReactQuery from "@/components/utils/query-client";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Avinash Ganore - Software Developer",
  description: "Result Driven Software Developer",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable}`}>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <QueryReactQuery>
        {children}
        </QueryReactQuery>
        <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
      </body>
    </html>
  )
}
