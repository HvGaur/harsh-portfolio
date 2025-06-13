"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ]

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    closed: { opacity: 0, x: 50 },
    open: { opacity: 1, x: 0 },
  }

  return (
    <>
      <header
        className={cn(
          "fixed left-0 top-0 z-40 w-full px-6 py-4 transition-all duration-300 md:px-12",
          scrolled ? "bg-[#0a0a0a]/90 backdrop-blur-md" : "bg-transparent",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <motion.a
            href="#home"
            className="text-xl font-bold text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            HVG
          </motion.a>

          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <a
                    href={item.href}
                    className="hover-target relative text-sm font-medium text-white/70 transition-colors hover:text-white"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>

          <motion.button
            className="hover-target relative z-50 block md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex h-10 w-10 items-center justify-center">
              <div className="space-y-2">
                <span
                  className={cn(
                    "block h-0.5 w-8 bg-white transition-all duration-300",
                    menuOpen && "translate-y-2.5 rotate-45",
                  )}
                />
                <span className={cn("block h-0.5 w-8 bg-white transition-all duration-300", menuOpen && "opacity-0")} />
                <span
                  className={cn(
                    "block h-0.5 w-8 bg-white transition-all duration-300",
                    menuOpen && "-translate-y-2.5 -rotate-45",
                  )}
                />
              </div>
            </div>
          </motion.button>
        </div>
      </header>

      <motion.div
        className="fixed inset-0 z-30 flex bg-black/95 md:hidden"
        initial="closed"
        animate={menuOpen ? "open" : "closed"}
        variants={menuVariants}
      >
        <div className="flex h-full w-full flex-col items-center justify-center">
          <ul className="flex flex-col items-center space-y-8">
            {navItems.map((item) => (
              <motion.li key={item.name} variants={itemVariants}>
                <a
                  href={item.href}
                  className="hover-target text-3xl font-medium text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </>
  )
}
