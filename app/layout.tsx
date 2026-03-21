import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import QueryReactQuery from "@/components/utils/query-client";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  metadataBase: new URL('https://avinashganore.xyz'),
  title: 'Avinash Ganore - Software Developer',
  description: 'Result Driven Software Developer',
  authors: [{ name: 'Avinash Ganore' }],
  creator: 'Avinash Ganore',
  publisher: 'Avinash Ganore',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://avinashganore.xyz',
    title: 'Avinash Ganore - Software Developer',
    description: 'Result Driven Software Developer',
    siteName: 'Avinash Ganore',
    locale: 'en_US',
    images: [
      {
        url: '/og.webp',
        secureUrl: '/og.webp',
        width: 1200,
        height: 630,
        alt: 'Avinash Ganore - Software Developer',
        type: 'image/webp',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Avinash Ganore - Software Developer',
    description: 'Result Driven Software Developer',
    images: ['/og.webp'],
  },
  alternates: {
    canonical: 'https://avinashganore.xyz',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const themeScript = `
    (function () {
      try {
        var key = "theme";
        var stored = localStorage.getItem(key);

        if (stored === "light") {
          document.documentElement.classList.remove("dark");
          return;
        }

        if (stored === "dark") {
          document.documentElement.classList.add("dark");
          return;
        }

        document.documentElement.classList.add("dark");
        localStorage.setItem(key, "dark");
      } catch (e) {
        document.documentElement.classList.add("dark");
      }
    })();
  `

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <QueryReactQuery>
        {children}
        </QueryReactQuery>
        <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
      </body>
    </html>
  )
}
