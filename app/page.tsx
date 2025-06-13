"use client"

import { useEffect, useRef, useState } from "react"
import { ReactLenis } from "@studio-freight/react-lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import Skills from "@/components/skills"
import Contact from "@/components/contact"
import Cursor from "@/components/cursor"
import Preloader from "@/components/preloader"

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isLoading && mainRef.current) {
      // Initialize animations after loading
      const ctx = gsap.context(() => {
        // Stagger sections appearance
        gsap.fromTo(
          ".section",
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            duration: 1,
            ease: "power3.out",
          },
        )
      }, mainRef)

      return () => ctx.revert()
    }
  }, [isLoading])

  const lenisOptions = {
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: "vertical",
    gestureDirection: "vertical",
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
  }

  if (isLoading) {
    return <Preloader />
  }

  return (
    <>
      <Cursor />
      <ReactLenis root options={lenisOptions}>
        <main ref={mainRef} className="relative bg-[#0a0a0a] text-white">
          <Navbar />
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
        </main>
      </ReactLenis>
    </>
  )
}
