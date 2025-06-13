import type React from "react"
import type { Metadata } from "next"
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

// Load Bricolage Grotesque font
const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-grotesque",
  weight: ["400", "500", "600", "700", "800"],
})

// Load JetBrains Mono font
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
  weight: ["400", "500", "600", "700"], // you can adjust as needed
})

export const metadata: Metadata = {
  title: "Harsh Vardhan Gaur | Portfolio",
  description: "Software Engineer with expertise in Java, Angular, and full-stack development",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${bricolageGrotesque.variable} ${jetbrainsMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
