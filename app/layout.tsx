import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Footer } from "@/components/footer"
import { ApiStatusGate } from "@/components/ApiStatusGate"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ResumeXpert - AI Resume Analysis",
  description: "AI-powered resume analysis and ranking to help you land your dream job",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ApiStatusGate>
          {children}
        </ApiStatusGate>
        <Footer />
      </body>
    </html>
  )
}
